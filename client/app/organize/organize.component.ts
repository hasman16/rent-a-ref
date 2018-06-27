import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastComponent } from '../shared/toast/toast.component';
import {
  AuthService,
  OrganizeService,
  StatesService,
  UserService
} from '../services/index';
import {
  Address,
  BaseModel,
  Phone,
  Option,
  Organization,
  Page,
  PagedData,
  Profile,
  State,
  User
} from '../shared/models/index';
import {
  AlertModalService,
  AlertState,
  AlertButtonState
} from '../shared/alert-modal/index';
import {
  CropImageModalService,
  CropImageState,
  UploadState
} from '../shared/crop-image-modal/index';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'rar-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizeComponent implements OnInit {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  private subscriptions: Subscription[] = [];
  protected countryName: string;
  protected currentModel: any = {};
  public titles: string[] = ['Organization Name', '', ''];
  public heading: string = 'You have no <i>organizations</i>.';
  public organizations: Organization[] = [];
  protected isLoading: boolean = false;
  public isEditing: boolean = false;
  public showDialog: boolean = false;
  public defaultImage: string = 'assets/images/ball.png';
  public destination: string;
  public delete_id: string;

  constructor(
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private organizeService: OrganizeService,
    private alertModalService: AlertModalService,
    private cropImageModalService: CropImageModalService
  ) {}

  ngOnInit() {
    const organizations: Organization[] = this.route.snapshot.data
      .organizations;
    this.organizations = _.isArray(organizations) ? organizations : [];
    this.setOrganizeMode();
    this.subscriptions.push(
      this.cropImageModalService.cropImageSubject$.subscribe(
        (cropImageState: CropImageState) => {
          if (cropImageState.uploadState === UploadState.Success) {
            this.getOrganizations();
          }
          this.cd.markForCheck();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  getImageAddress(organization: Organization): string {
    let url = _.get(organization, 'images[0].location', '');
    return url;
  }

  openModal(organization: Organization): void {
    this.destination = `/api/upload_logo/${organization.id}`;
    this.cropImageModalService.show();
  }

  closeModal($event): void {
    this.cropImageModalService.hide();
  }

  setOrganizeMode(): void {
    this.currentModel = {};
    this.isEditing = false;
    this.setHeadingTitle();
  }

  setEditMode(model): void {
    this.currentModel = _.cloneDeep(model);
    this.isEditing = true;
    this.setHeadingTitle();
  }

  modelHasId(model: any): boolean {
    return _.has(model, 'id') && Number(model.id) > 0;
  }

  getSubmitText(hasId) {
    return hasId ? 'Update Organization' : 'Create Organization';
  }

  setHeadingTitle(): void {
    if (this.isEditing) {
      const hasId = this.modelHasId(this.currentModel);
      this.heading = this.getSubmitText(hasId);
    } else {
      if (this.organizations.length > 0) {
        this.heading = 'Available Organizations';
      } else {
        this.heading = 'You have no <i>organizations</i>.';
      }
    }
  }

  public goNewOrganization(): void {
    this.setEditMode({});
  }

  public goDeleteOrganization(org_id): void {
    this.delete_id = org_id;
    this.alertModalService.show();
    this.alertModalService.alertSubject$
      .take(1)
      .switchMap((state: AlertState) => {
        let observable$: Observable<any>;
        if (state.alertButtonState === AlertButtonState.Ok) {
          observable$ = this.organizeService.deleteOrganization(org_id);
        } else {
          let modalSubject: Subject<boolean> = new Subject<boolean>();
          observable$ = modalSubject.asObservable();
          modalSubject.next(true);
        }
        return observable$;
      })
      .finally(() => {
        this.cd.markForCheck();
        this.getOrganizations();
      })
      .subscribe((state: AlertState) => {
        console.log('state is:', state);
      });
  }

  public editOrganization(orgId: number): void {
    let currentModel: any = _.find(
      this.organizations,
      organization => organization.id == orgId
    );
    if (currentModel) {
      this.organizeService
        .getOrgAddresses(orgId)
        .combineLatest(this.organizeService.getOrgPhones(orgId))
        .take(1)
        .map(([addresses, phones]: [Array<any>, Array<any>]) => {
          return [_.head(addresses), _.head(phones)];
        })
        .map(([addresses, phones]: [any, any]) => {
          return [addresses['addresses'], phones['phones']];
        })
        .finally(() => {
          this.cd.markForCheck();
        })
        .subscribe(([addresses, phones]: [Array<Address>, Array<Phone>]) => {
          currentModel = _.cloneDeep(currentModel);
          currentModel = Object.assign({}, currentModel, {
            addresses: addresses,
            phones: phones
          });
          this.setEditMode(currentModel);
        });
    }
  }

  editEvents(organization_id: number): void {
    this.router.navigate([`/organization/${organization_id}/events/`]);
  }

  getOrganizations(user_id?: any) {
    const currentUser: User = this.auth.getCurrentUser();

    user_id = user_id || currentUser.id;

    this.organizeService
      .getUserOrganization(user_id)
      .finally(() => {
        this.cd.markForCheck();
        this.setOrganizeMode();
        this.isLoading = false;
        if (this.organizations.length === 0) {
          this.setOrganizeMode();
        }
      })
      .subscribe(
        (profile: Profile) => {
          this.organizations = profile.organizations;
        },
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  submitOrganization(model): void {
    if (_.isNil(model.id) || !model.id) {
      this.submitNewOrganization(model);
    } else {
      this.submitUpdateOrganization(model);
      this.setOrganizeMode();
    }
  }

  submitNewOrganization(model): void {
    this.isLoading = true;
    this.organizeService
      .createOrganization({
        name: model.name
      })
      .switchMap(organization => {
        const org_id: any = organization.id;
        return this.organizeService
          .bulkCreateAddresses(model.addresses, org_id)
          .combineLatest(
            this.organizeService.bulkCreatePhones(model.phones, org_id)
          );
      })
      .finally(() => {
        this.cd.markForCheck();
      })
      .subscribe(
        ([addresses, phones]: [Array<Address>, Array<Phone>]) => {
          console.log('it worked');
        },
        (err: HttpErrorResponse) => this.callFailure(err),
        () => {
          this.getOrganizations();
        }
      );
  }

  private updatedPhones(newPhones: Phone[], oldPhones: Phone[]): Phone[] {
    return this.updatedItems<Phone>(newPhones, oldPhones);
  }

  private updatedAddresses(
    newAddresses: Address[],
    oldAddresses: Address[]
  ): Address[] {
    return this.updatedItems<Address>(newAddresses, oldAddresses);
  }

  private updatedItems<T extends BaseModel>(newItems: T[], oldItems: T[]): T[] {
    return _(newItems)
      .filter((newItem: T) => {
        let item: T = _.find(
          oldItems,
          (oldItem: T) => oldItem.id === newItem.id
        );
        return item ? true : false;
      })
      .filter((item: T) => !_.isNil(item.id))
      .value();
  }

  private deletedPhones(newPhones: Phone[], oldPhones: Phone[]): Phone[] {
    return this.deleteItems<Phone>(newPhones, oldPhones);
  }

  private deletedAddresses(
    newAddresses: Address[],
    oldAddresses: Address[]
  ): Address[] {
    return this.deleteItems<Address>(newAddresses, oldAddresses);
  }

  private deleteItems<T extends BaseModel>(newItems: T[], oldItems: T[]): T[] {
    return _(newItems)
      .filter((newItem: T) => {
        return !_.some(oldItems, (oldItem: T) => {
          return oldItem.id === newItem.id;
        });
      })
      .filter((item: T) => !_.isNil(item.id))
      .value();
  }

  submitUpdateOrganization(model): void {
    let newPhones: Phone[] = _.filter(model.phones, (phone: Phone) =>
      _.isNil(phone.id)
    );
    let newAddresses: Address[] = _.filter(
      model.addresses,
      (address: Address) => _.isNil(address.id)
    );

    let deletedPhones: Phone[] = this.deletedPhones(
      model.phones,
      this.currentModel.phones
    );
    let deletedAddresses: Address[] = this.deletedAddresses(
      model.addresses,
      this.currentModel.addresses
    );

    let updatedPhones: Phone[] = this.updatedPhones(
      model.phones,
      this.currentModel.phones
    );
    let updatedAddresses: Address[] = this.updatedAddresses(
      model.addresses,
      this.currentModel.addresses
    );

    const org_id: any = model.id;

    this.isLoading = true;

    this.organizeService
      .updateOrganization(
        {
          name: model.name
        },
        org_id
      )
      .switchMap(organization => {
        return this.organizeService
          .bulkCreateAddresses(newAddresses, org_id)
          .combineLatest(
            this.organizeService.bulkCreatePhones(newPhones, org_id)
          );
      })
      .switchMap(([addresses, phones]: [Array<Address>, Array<Phone>]) => {
        return this.organizeService
          .bulkUpdateAddresses(updatedAddresses, org_id)
          .combineLatest(
            this.organizeService.bulkUpdatePhones(updatedPhones, org_id)
          );
      })
      .finally(() => {
        this.cd.markForCheck();
      })
      .subscribe(
        ([addresses, phones]: [Array<Address>, Array<Phone>]) => {
          console.log('submitUpdateOrganization worked');
        },
        (err: HttpErrorResponse) => this.callFailure(err),
        () => {
          this.getOrganizations();
        }
      );
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

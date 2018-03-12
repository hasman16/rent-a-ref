import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  EmailValidator,
  ReactiveFormsModule
} from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

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
  Profile,
  Sport,
  State
} from '../shared/models/index';

import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: State[];
  protected form: FormGroup = new FormGroup({});
  protected model: any = {};
  protected currentModel: any = {};
  protected options: FormlyFormOptions = <FormlyFormOptions>{};
  protected fields: FormlyFieldConfig[];
  protected titles: string[] = ['Id', 'Organization Name', '', ''];
  protected organizations: Organization[] = [];
  protected isLoading: boolean = false;
  protected isEditing: boolean = false;

  constructor(
    private auth: AuthService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private organizeService: OrganizeService
  ) {}

  ngOnInit() {
    this.setOrganizeMode();
    this.getSports();
    this.getOrganizations();
  }

  setOrganizeMode(): void {
    this.currentModel = {};
    this.isEditing = false;
  }

  setEditMode(model): void {
    this.currentModel = _.cloneDeep(model);
    this.isEditing = true;
  }

  goNewOrganization(): void {
    this.setEditMode({});
  }

  editOrganization(orgId: number): void {
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

  getSports() {
    this.organizeService.getSports().subscribe((sports: Sport[]) => {
      console.log('sports:', sports);
    });
  }

  editEvents() {}

  getOrganizations(user_id?: any) {
    user_id = user_id || this.auth.currentUser.id;

    this.organizeService.getUserOrganization(user_id).subscribe(
      (profile: Profile) => {
        this.organizations = profile.organizations;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log(
            'A client-side or network error occurred for the Profile',
            this.auth.loggedIn
          );
        } else {
          console.log(
            'The backend returned an unsuccessful response code for the profile',
            this.auth.loggedIn
          );
        }
      },
      () => {
        this.setOrganizeMode();
        this.isLoading = false;
        if (this.organizations.length === 0) {
          this.setOrganizeMode();
        }
      }
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
      .subscribe(
        ([addresses, phones]: [Array<Address>, Array<Phone>]) => {
          console.log('it worked');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log(
              'A client-side or network error occurred for the Profile',
              this.auth.loggedIn
            );
          } else {
            console.log(
              'The backend returned an unsuccessful response code for the profile',
              this.auth.loggedIn
            );
          }
        },
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
      .subscribe(
        ([addresses, phones]: [Array<Address>, Array<Phone>]) => {
          console.log('submitUpdateOrganization worked');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log(
              'A client-side or network error occurred for the Profile',
              this.auth.loggedIn
            );
          } else {
            console.log(
              'The backend returned an unsuccessful response code for the profile',
              this.auth.loggedIn
            );
          }
        },
        () => {
          this.getOrganizations();
        }
      );
  }
}

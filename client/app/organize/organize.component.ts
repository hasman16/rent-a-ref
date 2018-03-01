import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService, OrganizeService, State, StatesService, UserService } from '../services/index';
import { Address, Phone, Organization, Profile } from '../shared/models/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {
  @Input() set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: State[];
  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];
  protected titles: string[] = ['Id', 'Organization Name'];
  protected organizations: Organization[] = [];
  protected isLoading: boolean = false;

  protected editMode: boolean = false;
  protected createMode: boolean = false;
  protected updateMode: boolean = false;

  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private organizeService: OrganizeService) {
  }

  ngOnInit() {
    this.getOrganizations();
  }

  goNewOrganization(): void {
    this.updateMode = false;
    this.createMode = true;
    this.editMode = true;
  }

  getOrganizations(user_id?: any) {
    user_id = user_id || this.auth.currentUser.id;

    this.organizeService
      .getUserOrganization(user_id)
      .subscribe(
      (profile: Profile) => {
        this.organizations = profile.organizations;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile', this.auth.loggedIn);
        } else {
          console.log('The backend returned an unsuccessful response code for the profile', this.auth.loggedIn);
        }
      },
      () => {
        this.isLoading = false;
      }
      );
  }

  submitNewOrganization(model):void {
    console.log('organization data is:', model);

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
      ([addresses, phones]:[Array<Address>, Array<Phone>]) => {
       console.log('it worked');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile', this.auth.loggedIn);
        } else {
          console.log('The backend returned an unsuccessful response code for the profile', this.auth.loggedIn);
        }
      },
      () =>  {
        this.getOrganizations();
      });
  }

  submitUpdate(model):void {
    console.log('organization data is:', model);
  }
}

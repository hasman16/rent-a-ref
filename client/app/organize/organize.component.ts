import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService, OrganizeService, StatesService, UserService } from '../services/index';
import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Address, Phone, Organization, Profile } from '../shared/models/index';
import { compareFields } from '../shared/compareFields';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as moment from 'moment';

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
  protected countryName:string;
  protected states:string[];
  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];
  protected titles: string[] = ['Id','Organization Name'];
  protected organizations: Organization[] = [];
  protected isLoading: boolean = false;

  constructor(private auth: AuthService,
    public toast: ToastComponent, private route: ActivatedRoute, 
    private router: Router, private statesService: StatesService, private organizeService: OrganizeService) {

    this.states = this.statesService.getStatesProvinces(this.countryName);
  }

  ngOnInit() { 
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Organization Name',
            },
          }
        ],
      },
      {
        template: '<hr /><div><strong>Address:</strong></div>',
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-2',
            type: 'input',
            key: 'street1',
            templateOptions: {
              label: 'Street 1',
            },
          },
          {
            className: 'flex-2',
            type: 'input',
            key: 'street2',
            templateOptions: {
              label: 'Street 2',
            },
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'cityName',
            templateOptions: {
              label: 'City',
            },
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'statename',
            templateOptions: {
              label: 'State',
            },
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'zip',
            templateOptions: {
              type: 'number',
              label: 'Zip',
              max: 99999,
              min: 0,
              pattern: '\\d{5}',
            },
          },
        ],
      },
      {
        template: '<hr />',
      },
      {
        type: 'input',
        key: 'otherInput',
        templateOptions: {
          label: 'Other Input',
        },
      },
      {
        type: 'checkbox',
        key: 'otherToo',
        templateOptions: {
          label: 'Other Checkbox',
        },
      },
    ];

    this.getOrganizations();
  }

  getOrganizations(user_id?:any) {
    user_id = user_id || this.auth.currentUser.id;

     this.organizeService
      .getUserOrganization(user_id)
     .subscribe(
      (profile: Profile) => {
        console.log('data:', profile );
        this.organizations = profile.organizations;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile', this.auth.loggedIn);
        } else {
          console.log('The backend returned an unsuccessful response code for the profile', this.auth.loggedIn);
        }
        this.isLoading = false;
        if (!this.auth.loggedIn) {
          this.auth.logout();
        }
      }
    );
  }

  submit() {
    alert(JSON.stringify(this.model));
  }

}

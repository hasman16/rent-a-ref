import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { StatesService } from '../services/states.service';
import { UserService } from '../services/user.service';
import { OrganizeService } from '../services/organize.service';
import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { AddressModel } from '../shared/models/addressModel';
import { compareFields } from '../shared/compareFields';
import { PhoneModel } from '../shared/models/phoneModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

/*"angular-2-data-table": "^0.1.2", */
@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {
  isLoading = true;
  showUpdateDivOrg_name = true;
  showDivOrg_name = true;
  saveFlag = 'no';
  Org_number = 0;
  line1Invalid = false;
  cityInvalid = false;
  zipInvalid = false;
  countryName = 'usa';
  mode = false;
  states: any;
  anAddress: any;
  @Input() set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
    this.fillForm(this.org_id);
  }
  // Initialize the organization id
  org_data_address:AddressModel;
  id: number;
  org_id: number;
  message = '';
  messages: any = {
    'phone': 'Update Your Phones',
    'address': 'Update Your Address'
  };
  data = {};
  org_data = [];
  address: AddressModel;
  addresses = [];
  phones = [];
  phone: PhoneModel;
  dummyAddress: AddressModel = new AddressModel({});
  dummyPhone: PhoneModel = new PhoneModel({});

  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '^\\d{5}(?:[ -]{1}\\d{4})?$';
  responseParse = '';
  // special params:

// Datatable end
  organizeFlag = false;
  selectedValue;
  abort = false;

  userDatas = { id: '', name: '', user_id: ''};
  userData;
  orgDataPhones = { id: '', number: '', description: ''};

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  public dateModel;

  organizationForm: FormGroup;
  organizationUpdateForm: FormGroup;
  organizationViewForm: FormGroup;

  org_name = new FormControl('', [Validators.required, Validators.minLength(2),
    Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]);
  line1 = new FormControl('', [Validators.required, Validators.minLength(5),
  Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]);

  line2 = new FormControl('', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]);

  city = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);

  state = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]);

  zip = new FormControl('', [Validators.required, Validators.minLength(5),
  Validators.maxLength(10), Validators.pattern(this.zipRegex)]);
  number = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);
  description = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]);

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService, private organizeService: OrganizeService) {

    this.states = this.statesService.getStatesProvinces(this.countryName);
    // this.setUpValidators(this.organizationForm, ['line1', 'city', 'zip']);
    this.subscribeToParams(route);
  }

  subscribeToParams(route) {
    this.organizationForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
        Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]],
      line1: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      line2: ['', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      city: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],

      state: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]],

      zip: ['', [Validators.required, Validators.minLength(5),
        Validators.maxLength(10), Validators.pattern(this.zipRegex)]],
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });
    // Update

    this.organizationUpdateForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]],
      line1: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      line2: ['', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      city: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],

      state: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]],

      zip: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(10), Validators.pattern(this.zipRegex)]],
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });
    // View
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  }
// Datatable end
  fillForm(org_id1) {
    this.getOrganizations();

    this.states = this.statesService.getStatesProvinces(this.countryName);
    this.organizationForm.setValue({
      org_name: this.userDatas.name,
      // line1: this.org_data_address.line1,
      line1: JSON.stringify('21622 Marguerite pky'),
      line2: this.org_data_address.line2,
      city: this.org_data_address.city,
      state: this.org_data_address.state,
      zip: this.org_data_address.zip,
      // number: this.orgDataPhones.number,
      // description: this.orgDataPhones.description
      number: '949-201-3340',
      description: 'mobile'

    });
  }

  ngOnInit() {
    // this.getOrganizations();
    this.getUserOrganizations();
    if (this.Org_number === 0) {
      this.isLoading = false;
    }
    // this.fillForm();

  }

  getOrgValue() {
    const org = this.organizationForm.value;
    console.log('org: ', org);
    return {
      name: org.org_name,
      number: org.number,
      description: org.description,
      id: 0,
      line1: org.line1,
      line2: org.line2,
      city: org.city,
      state: org.state,
      zip: org.zip
    };
  }
// Update
  getOrgUpdateValue() {
    const org = this.organizationUpdateForm.value;
    console.log('org: ', org);
    return {
      name: org.org_name,
      number: org.number,
      description: org.description,
      // id: 0,
      line1: org.line1,
      line2: org.line2,
      city: org.city,
      state: org.state,
      zip: org.zip
    };
  }

  createOrganization() {
    let organizationId=0;
    this.organizeService
    .createOrganization(this.getOrgValue())
    .mergeMap( (res:any) => {
      this.toast.setMessage('New Organization Successfully Created', 'success');
      organizationId = JSON.parse(res['_body'])['id'];
      return this.organizeService.createPhone(this.getOrgValue(), organizationId);
    })
    .mergeMap( (res:any) => {
      this.toast.setMessage('New Organization Phone Successfully Created', 'success');
      return this.organizeService.createAddress(this.getOrgValue(), organizationId);
    })
    .subscribe(
      res => {
        this.saveFlag = 'yes';
        this.callSuccess(res);
        this.showDivOrg_name = false;
        this.toast.setMessage('New Organization Address Successfully Created', 'success');
      },
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      },
      () => {
        this.saveFlag = 'yes';
        this.showDivOrg_name = false;
      }
    );

  }

  updateOrganization() {
    this.organizeService.updateOrganization(this.getOrgUpdateValue(), this.org_id).subscribe(
      res => {
        this.callSuccess(res);
        console.log('Message Update: ', res.ok);

        // Update Phone
        this.responseParse = JSON.parse(res['_body']);
        console.log('id Update: ', this.responseParse['id']);
        if (res.ok) {
          this.organizeService.updatePhone(this.getOrgUpdateValue(), this.responseParse['id']).subscribe(
            PhoneResponse => {
              this.callSuccess(PhoneResponse);
              console.log('PhoneResponse: ', PhoneResponse);
              if (PhoneResponse.statusText === 'OK') {
                // Create Address
                console.log('Org id Update: ', this.responseParse['id']);
                this.organizeService.updateAddresses(this.getOrgUpdateValue(), this.responseParse['id']).subscribe(
                  AddressResponse => {
                    this.callSuccess(AddressResponse);
                    console.log('AddressResponse: ', AddressResponse);
                    this.toast.setMessage('Organization Successfully Updated', 'success');
                    this.showUpdateDivOrg_name = false;
                  },
                  (AddressErr: HttpErrorResponse) => {
                    this.callFailure(AddressErr);
                  }
                );

              }
            },
            (phoneErr: HttpErrorResponse) => {
              this.callFailure(phoneErr);
            }
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }

  getOrganizations() {
    // this.isLoading = true;
    console.log('this.org_id: ', this.org_id);
    this.organizeService.getOrganization(this.org_id).subscribe(
      res => {
        // this.data = res;
        this.userDatas = res;
        console.log('res: ', res);
        console.log('res name: ', this.userDatas.name);
        // Address
        this.organizeService.getOrgAddresses(this.org_id).subscribe(
          AddresResp => {
            this.org_data_address = AddresResp;
            console.log('this.org_data_address: ', this.org_data_address);
            console.log('res Addresss name: ', this.org_data_address.line1);
            // this.line1.setValue('Testing 123');
            // Phone
            this.organizeService.getOrgPhones(this.org_id).subscribe(
              PhoneResp => {
                this.orgDataPhones = PhoneResp;
                console.log('this.orgDataPhones: ', this.orgDataPhones);
                console.log('res number: ', this.orgDataPhones.number);
              },
              (PhoneErr: HttpErrorResponse) => {
                if (PhoneErr.error instanceof Error) {
                  // A client-side or network error occurred. Handle it accordingly.
                  console.log('A client-side or network error occurred: ', JSON.parse(PhoneErr['statusText']));
                } else {
                  console.log('The backend returned an unsuccessful response: ', JSON.parse(PhoneErr['statusText']));
                }
                // this.isLoading = false;

              }
            );
          },
          (Addresserr: HttpErrorResponse) => {
            if (Addresserr.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('A client-side or network error occurred: ', JSON.parse(Addresserr['statusText']));
            } else {
              console.log('The backend returned an unsuccessful response: ', JSON.parse(Addresserr['statusText']));
            }
            // this.isLoading = false;

          }
        );

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred: ', JSON.parse(err['statusText']));
        } else {
          console.log('The backend returned an unsuccessful response: ', JSON.parse(err['statusText']));
        }
        // this.isLoading = false;

      }
    );
  }
    // User Oganization
    getUserOrganizations() {
      this.isLoading = true;
      this.organizeService.getUserOrganization(this.auth.currentUser.id).subscribe(
        res => {
          this.data = res;
          this.org_data = res.organizations;
          console.log('id: ', this.id, '     Number of org: ', this.org_data.length);
          this.Org_number = res.organizations.length;
          if (this.id > 0) {
            this.org_id = this.id;
            this.getOrganizations();
          } else {
            this.org_name = this.org_data[0].name;
            this.org_id = this.org_data[0].id;
          }
          console.log('res user data: ', this.data);
          console.log('res name: ', this.org_name, ' this.org_id: ', this.org_id );

          this.isLoading = false;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('A client-side or network error occurred: ', JSON.parse(err['statusText']));
          } else {
            console.log('The backend returned an unsuccessful response: ', JSON.parse(err['statusText']));
          }
          this.isLoading = false;
          if (!this.auth.loggedIn) {
            this.abort = true;
            this.auth.logout();
          }
        }
      );
}

  callSuccess(res) {
    console.log('callSuccess: ', res, ' name statusText: ', res.statusText);
    console.log('response _body:', JSON.parse(res['_body']));
  }

  callFailure(err: HttpErrorResponse, message = 'Failed, Please try again') {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toast.setMessage(message, 'danger');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }

  onChange(id) {
    this.org_id = id;
    this.getOrganizations();
    console.log('Event: ', id);
    // Reload the page
    // this.router.navigate(['organizer', this.auth.currentUser.id], { relativeTo: this.route, queryParamsHandling: 'preserve' });

    this.router.navigate(['**'], { skipLocationChange: true });
    setTimeout(function () {
      this.router.navigate(['organizer', this.auth.currentUser.id],
        { queryParams: { id: this.org_id} }
      );
    }.bind(this));
  }

  setClassName() {
    return { 'has-danger': !this.org_name.pristine && !this.org_name.valid };
  }
}

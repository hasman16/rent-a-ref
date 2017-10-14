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
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';
import { films } from './organize-data';
import { AddressType } from '../shared/models/addressType';
import { compareFields } from '../shared/compareFields';
import { PhoneType } from '../shared/models/phoneType';
// import { AbstractFormComponent } from '../abstract-form';extends AbstractFormComponent
import 'rxjs/add/operator/debounceTime';

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
  org_data_address = { line1: '', line2: '', city: '', state: '', zip: '' };
  id: number;
  org_id: number;
  message = '';
  messages: any = {
    'phone': 'Update Your Phones',
    'address': 'Update Your Address'
  };
  data = {};
  org_data = [];
  address: AddressType;
  addresses = [];
  phones = [];
  phone: PhoneType;
  dummyAddress: AddressType = new AddressType({});
  dummyPhone: PhoneType = new PhoneType({});

  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '^\\d{5}(?:[ -]{1}\\d{4})?$';
  responseParse = '';
  // Datadable start
  filmResource = new DataTableResource(films);
  films = [];
  filmCount = 0;
  update: any = 'update';
  create: any = 'create';
  view: any = 'view';
  @ViewChild(DataTable) filmsTable;
  // special params:

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
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
/*
  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }
*/

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService, private organizeService: OrganizeService) {

    this.states = this.statesService.getStatesProvinces(this.countryName);
    // this.setUpValidators(this.organizationForm, ['line1', 'city', 'zip']);
    this.subscribeToParams(route);
    this.filmResource.count().then(count => this.filmCount = count);
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
    /*this.organizationViewForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]]
    });*/
  }

  // Datatable start
  reloadFilms(params) {
    this.filmResource.query(params).then(films => this.films = films);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  }
// Datatable end
  fillForm(org_id1) {
    console.log('Current Org id: ', this.org_id, ' passed: ', org_id1);
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
    /*console.log('onInit: call createOrganization:', this.organizationForm.value);
    this.organizationForm.setValue({
      org_name: 'Testing testing'
    });
    this.createOrganization();*/
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
    this.organizeService.createOrganization(this.getOrgValue()).subscribe(
      res => {
        this.callSuccess(res);
        // console.log('Return msg: ', JSON.parse(res['statusText']));
        // this.toast.setMessage(JSON.parse(res['statusText']), 'success');
        // this.onCancel();
        // this.message = JSON.parse(res['statusText']);

        console.log('Message: ', res.ok);
        this.saveFlag = 'yes';
        // console.log('saveFlag: ', this.saveFlag);
        // Create Phone
        this.responseParse = JSON.parse(res['_body']);
        console.log('id: ', this.responseParse['id']);
        if (res.ok) {
          this.organizeService.createPhone(this.getOrgValue(), this.responseParse['id']).subscribe(
            PhoneResponse => {
              this.callSuccess(PhoneResponse);
              console.log('PhoneResponse: ', PhoneResponse);
              if (PhoneResponse.statusText === 'OK') {
                // Create Address
                console.log('Org id: ', this.responseParse['id']);
                this.organizeService.createAddress(this.getOrgValue(), this.responseParse['id']).subscribe(
                  AddressResponse => {
                    this.callSuccess(AddressResponse);
                    console.log('AddressResponse: ', AddressResponse);
                    this.toast.setMessage('New Organization Successfully Created', 'success');
                    this.showDivOrg_name = false;
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
      }  ,
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
    /*if (this.saveFlag === 'yes') {
      console.log('Reloading');
      this.showDivOrg_name = false;
      // Reload the page
      this.router.navigate(['organizer', this.auth.currentUser.id], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }*/
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
/*
  getOrganizations() {
    this.userService.getOrganization(this.auth.currentUser.id).subscribe(
      // data => this.users = data,
      // error => console.log(error),
      // () => this.isLoading = false
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }
*/

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

          // this.responseParse = JSON.parse(res['_body']);
          // console.log('id: ', this.responseParse['id'], 'Name: ', this.responseParse['name']);
          /*
          this.addresses = _.sortBy(res.addresses, 'id');
          this.phones = _.sortBy(res.phones, 'id');
          this.birthday = moment(res.person.dob).format('LL');
          if (JSON.stringify(res.person.middlenames) !== 'null') {
            this.middlenameFlag = true;
          }*/
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

    // User Oganization
    /*getOrganization() {
      // this.isLoading = true;
      this.organizeService.getOrganization(this.org_id).subscribe(
        res => {
          this.userDatas = res;
          console.log('res org this.userDatas: ', this.userDatas);
          this.org_name = res.name;
          console.log('res name org: ', this.org_name, ' org_id: ', this.org_id);

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('A client-side or network error occurred: ', JSON.parse(err['statusText']));
          } else {
            console.log('The backend returned an unsuccessful response: ', JSON.parse(err['statusText']));
          }
          this.isLoading = false;

        }
      );
    }*/

  callSuccess(res) {
    // this.org_name = res;
    console.log('callSuccess: ', res, ' name statusText: ', res.statusText);
    console.log('response _body:', JSON.parse(res['_body']));


    // this.toast.setMessage(JSON.parse(res['statusText']), 'success');
    // this.onCancel();
    // this.saveFlag = true;
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

    // this.resetDivs();
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

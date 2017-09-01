import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { StatesService } from '../../../services/states.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';
// import 'jquery-ui';
// import { DatepickerPopupComponent } from '../../../shared/datepicker-popup/datepicker-popup.component';
// import { NgbDatepickerModule } from '../../../shared/ngBootstrap/datepicker/datepicker.module';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  divPasswordFlag = false;
  divPassword = '';
  divBio = '';
  divBioFlag = false;
  divPhone = '';
  divPhoneFlag = false;

  divAddressFlag = false;
  divAddress = '';
  divZone = '';
  divZoneFlag = false;
  divPayment = '';
  divPaymentFlag = false;
  /*
    public dt: Date = new Date();
    public minDate: Date = void 0;
    public events: any[];
    public tomorrow: Date;
    public afterTomorrow: Date;
    public dateDisabled: { date: Date, mode: string }[];
    public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
      'shortDate'];
    public format: string = this.formats[0];
    public dateOptions: any = {
      formatYear: 'YY',
      startingDay: 1
    };
    private opened = false;
  */

  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  person = {};

  address = { id: '', line1: '', line2: '', city: '', state: '', zip: '' };
  addresses = [];
  phones = [];
  phone = {};
  isLoading = true;

  states;
  selectedValue;
  abort = false;

  public showDivreset = false;
  public showDivbio = false;
  public showDivPhone = false;
  public showDivAddress = false;
  public showDivZone = false;
  public showDivPayment = false;
  passwordForm: FormGroup;
  bioForm: FormGroup;
  phoneForm: FormGroup;
  addressForm: FormGroup;
  zoneForm: FormGroup;
  paymentForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  passcode = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);

  password = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);
  password1 = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);
  password2 = new FormControl('', [<any>Validators.required,
    <any>Validators.minLength(6)]);

  firstname = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  middlenames = new FormControl('', [Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  lastname = new FormControl('', [Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  gender = new FormControl('', [<any>Validators.nullValidator]);
  dob = new FormControl('', [<any>Validators.nullValidator]);

  uphone = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);
  description = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  line1 = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  line2 = new FormControl('', [Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  city = new FormControl('', [Validators.required, Validators.minLength(2),
    Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  state = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  zip = new FormControl('', [Validators.required, Validators.minLength(2),
    Validators.maxLength(12), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  acity = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  astate = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  azip = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(12), Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  aradius = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);

  paypalinfo = new FormControl('', [<any>Validators.nullValidator]);
  check = new FormControl('', [<any>Validators.nullValidator]);
  ccinfo = new FormControl('', [<any>Validators.nullValidator]);

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };

  // Initialized to specific date (09.10.2018).
  // public model: Object = { date: { year: 2018, month: 10, day: 9 } };
  public model;

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }
  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService) {
    /*const pass = this.route.snapshot.params['divPassword'];
    this.route.params.subscribe((params: Params) => {
      const divPass = params['divPassword'];
      console.log('divPass: ', divPass);
    });
    console.log('password: ', pass);*/
    // Password change
    route.queryParams.subscribe(
      data => this.divPassword = data['divPassword']);
    console.log('divPassword: ', this.divPassword);
    if (this.divPassword === 'password') {
      this.divPasswordFlag = true;
      this.showDivreset = true;
      this.showDivbio = false;
      this.divBioFlag = false;
      this.divPhoneFlag = false;
      this.showDivPhone = false;
      this.divAddressFlag = false;
      this.showDivAddress = false;
      this.divZoneFlag = false;
      this.showDivZone = false;
      this.divPaymentFlag = false;
      this.showDivPayment = false;
      this.passwordForm = this.formBuilder.group({
        // email: this.email,
        // passcode: this.passcode,
        password: this.password,
        password1: this.password1,
        password2: this.password2
      });
    }
      // User bio
      route.queryParams.subscribe(
        data => this.divBio = data['divBio']);
      console.log('divBio: ', this.divBio);
      if (this.divBio === 'bio') {
        this.divBioFlag = true;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.showDivbio = true;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;

        this.bioForm = this.formBuilder.group({
          firstname: this.firstname.value,
          middlenames: this.middlenames,
          lastname: this.lastname,
          gender: this.gender,
          dob: this.model
        });
      }
        //
        // User phone
        route.queryParams.subscribe(
          data => this.divPhone = data['divPhone']);
        console.log('divPhone: ', this.divPhone);
        if (this.divPhone === 'phones') {
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = true;
          this.showDivPhone = true;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          this.phoneForm = this.formBuilder.group({
            number: this.uphone,
            description: this.description
          });
        }
        //
          // User address
          route.queryParams.subscribe(
            data => this.divAddress = data['divAddress']);
          console.log('divAddress: ', this.divAddress);
          if (this.divAddress === 'address') {
            this.divBioFlag = false;
            this.showDivbio = false;
            this.divPasswordFlag = false;
            this.showDivreset = false;
            this.divPhoneFlag = false;
            this.showDivPhone = false;
            this.divAddressFlag = true;
            this.showDivAddress = true;
            this.divZoneFlag = false;
            this.showDivZone = false;
            this.divPaymentFlag = false;
            this.showDivPayment = false;

            this.addressForm = this.formBuilder.group({
              line1: this.line1,
              line2: this.line2,
              city: this.city,
              state: this.state,
              zip: this.zip
            });
          }
        //

            // User Zone
            route.queryParams.subscribe(
              data => this.divZone = data['divZone']);
            console.log('divZone: ', this.divZone);
            if (this.divZone === 'zone') {
              this.divBioFlag = false;
              this.showDivbio = false;
              this.divPasswordFlag = false;
              this.showDivreset = false;
              this.divPhoneFlag = false;
              this.showDivPhone = false;
              this.divAddressFlag = false;
              this.showDivAddress = false;
              this.divZoneFlag = true;
              this.showDivZone = true;
              this.divPaymentFlag = false;
              this.showDivPayment = false;

              this.zoneForm = this.formBuilder.group({
                city: this.acity,
                state: this.astate,
                zip: this.azip
              });
            }
        //
            // User Payment
            route.queryParams.subscribe(
              data => this.divPayment = data['divPayment']);
            console.log('divPayment: ', this.divPayment);
            if (this.divPayment === 'payment') {
              this.divBioFlag = false;
              this.showDivbio = false;
              this.divPasswordFlag = false;
              this.showDivreset = false;
              this.divPhoneFlag = false;
              this.showDivPhone = false;
              this.divAddressFlag = false;
              this.showDivAddress = false;
              this.divZoneFlag = false;
              this.showDivZone = false;
              this.divPaymentFlag = true;
              this.showDivPayment = true;

              this.paymentForm = this.formBuilder.group({
                paypalFlag: this.paypalFlag,
                paypalinfo: this.paypalinfo,
                checkFlag: this.checkFlag,
                ccFlag: this.ccFlag,
                ccinfo: this.ccinfo
              });
        //
    }


  }


  ngOnInit() {
    this.states = this.statesService.getStates();

    this.getProfile();

  }

  getProfile() {
    this.userService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
        this.data = res;
        this.user = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;


        this.address = this.addresses[0];
        this.phone = this.phones[0];
        this.selectedValue = res.person.gender;
        if (res.person.dob !== '') {
          const varYear = res.person.dob.substring(0, 4);
          const varMonth = res.person.dob.substring(5, 7);
          const varDay = res.person.dob.substring(8, 10);
          this.model = { date: { year: varYear, month: varMonth, day: varDay } };
          console.log('year: ' + varYear);
          console.log('month: ' + varMonth);
          console.log('day: ' + varDay);
}
        console.log('Response data edit: ' + JSON.stringify(res));
        console.log('Response person: ' + JSON.stringify(res.person));
        console.log('Response firstname: ' + JSON.stringify(res.person.firstname));
        console.log('Response middlenames: ' + JSON.stringify(res.person.middlenames));
        console.log('Response addresses: ' + JSON.stringify(res.addresses));
      },
      // error => this.auth.logout(),
      // () => this.isLoading = false
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile');
          this.isLoading = false;
          if (this.auth.loggedIn) {
          } else {
            this.abort = true;
            this.auth.logout();
          }
        } else {
          console.log('The backend returned an unsuccessful response code for the profile');
          this.isLoading = false;
          if (this.auth.loggedIn) {
          } else {
            this.abort = true;
            this.auth.logout();
          }
        }
      }
    );
  }
        /*
        this.user = res;
        this.email = res.email;
        if (this.divPasswordFlag) {
          this.abort = true;
        }
        // this.toast.setMessage(res.message, 'success');
        console.log('Response data: ' + JSON.stringify(res));
        console.log('status: ' + res.id + ' Message: ' + res.firstname);
      },
      // error => this.auth.logout(),
      // () => this.isLoading = false
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile');
          this.isLoading = false;
          if (this.auth.loggedIn) {
          } else {
            this.abort = true;
            this.auth.logout();
          }
        } else {
          console.log('The backend returned an unsuccessful response code for the profile');
          this.isLoading = false;
          if (this.auth.loggedIn) {
          } else {
            this.abort = true;
            this.auth.logout();
          }
        }
      }
    );
    console.log('data: ' + JSON.stringify(this.data));
  }

  getPerson() {
    this.userService.getPerson(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        // this.toast.setMessage(res.message, 'success');
        console.log('Response Person: ' + JSON.stringify(res));
        console.log('status person: ' + res.id + ' Message: ' + res.firstname);
      },
      error => console.log('Get Person error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }


  getPersonPhone() {
    this.userService.getUserPhone(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserPhone: ' + JSON.stringify(res));
        console.log('status getUserPhone: ' + res.id + ' Message: ' + res.phone);
      },
      error => console.log('Get getUserPhone error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }*/


  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  onCancel() {
    // this.router.navigate(['/login']);
    this.divBioFlag = false;
    this.showDivbio = false;
    this.divPasswordFlag = false;
    this.showDivreset = false;
    this.divPhoneFlag = false;
    this.showDivPhone = false;
    this.divAddressFlag = false;
    this.showDivAddress = false;
    this.divZoneFlag = false;
    this.showDivZone = false;
    this.divPaymentFlag = false;
    this.showDivPayment = false;
  }


  onPasswordSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.changepassword(this.passwordForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = true;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = true;
          this.showDivreset = true;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  onBioSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.updatePerson(this.bioForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = true;
          this.showDivbio = true;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = true;
          this.showDivbio = true;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  onPhoneSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.updatePhone(this.phoneForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = true;
          this.showDivPhone = true;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = true;
          this.showDivPhone = true;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  onAddressSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.updateAddress(this.addressForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = true;
          this.showDivAddress = true;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = true;
          this.showDivAddress = true;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }


  onZoneSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.updateZone(this.zoneForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = true;
          this.showDivZone = true;
          this.divPaymentFlag = false;
          this.showDivPayment = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = true;
          this.showDivZone = true;
          this.divPaymentFlag = false;
          this.showDivPayment = false;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  onPaymentSubmit() {
    // this.router.navigate(['passwordreset']);
    this.userService.updatePayment(this.paymentForm.value, this.user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        console.log('Response: ' + res);
        console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        // this.hideShowDiv = true;
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
        // this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('This email address does not exists', 'danger');
          // this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = true;
          this.showDivPayment = true;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.divBioFlag = false;
          this.showDivbio = false;
          this.divPasswordFlag = false;
          this.showDivreset = false;
          this.divPhoneFlag = false;
          this.showDivPhone = false;
          this.divAddressFlag = false;
          this.showDivAddress = false;
          this.divZoneFlag = false;
          this.showDivZone = false;
          this.divPaymentFlag = true;
          this.showDivPayment = true;

          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  setClassEmail1() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPasscode() {
    return { 'has-danger': !this.passcode.pristine && !this.passcode.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  setClassPassword1() {
    return { 'has-danger': !this.password1.pristine && !this.password1.valid };
  }
  setClassPassword2() {
    return { 'has-danger': !this.password2.pristine && !this.password2.valid };
  }
  setClassFirstname() {
    return { 'has-danger': !this.firstname.pristine && !this.firstname.valid };
  }
  setClassphone() {
    return { 'has-danger': !this.uphone.pristine && !this.uphone.valid };
  }
  setClassLine1() {
    return { 'has-danger': !this.line1.pristine && !this.line1.valid };
  }
  setClassCity() {
    return { 'has-danger': !this.city.pristine && !this.city.valid };
  }
  setClassState() {
    return { 'has-danger': !this.state.pristine && !this.state.valid };
  }
  setClassZip() {
    return { 'has-danger': !this.zip.pristine && !this.zip.valid };
  }

  setClassaCity() {
    return { 'has-danger': !this.acity.pristine && !this.acity.valid };
  }
  setClassaState() {
    return { 'has-danger': !this.astate.pristine && !this.astate.valid };
  }
  setClassaZip() {
    return { 'has-danger': !this.azip.pristine && !this.azip.valid };
  }
}


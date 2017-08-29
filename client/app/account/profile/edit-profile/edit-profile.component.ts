import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as $ from 'jquery';
// import 'jquery-ui';
// import { DatepickerPopupComponent } from '../../../shared/datepicker-popup/datepicker-popup.component';
import { NgbDatepickerModule } from '../../../shared/ngBootstrap/datepicker/datepicker.module';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  divPasswordFlag = false;
  divPassword = '';
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
  address = {id: '', line1: '', line2: '', city: '', state: '', zip: ''};
  isLoading = true;
  model;
  abort = false;

  public showDivreset = true;
  passwordForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  passcode = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);

  password = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);
  password1 = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);
  password2 = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService, private route: ActivatedRoute,
    private router: Router) {
    /*const pass = this.route.snapshot.params['divPassword'];
    this.route.params.subscribe((params: Params) => {
      const divPass = params['divPassword'];
      console.log('divPass: ', divPass);
    });
    console.log('password: ', pass);*/
    route.queryParams.subscribe(
      data => this.divPassword = data['divPassword']);
    console.log('divPassword: ', this.divPassword);
    if (this.divPassword === 'password') {
      this.divPasswordFlag = true;
      this.passwordForm = this.formBuilder.group({
        // email: this.email,
        // passcode: this.passcode,
        password: this.password,
        password1: this.password1,
        password2: this.password2
      });
    }

    /*
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      { date: this.tomorrow, status: 'full' },
      { date: this.afterTomorrow, status: 'partially' }
    ];*/
    /*
    console.log('divPassword: ', this.divPassword);
    /*
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      { date: this.tomorrow, status: 'full' },
      { date: this.afterTomorrow, status: 'partially' }
    ];*/
    /*
        $(function () {
          const bindDatePicker = function () {
            $("#datetimepicker1").datetimepicker({
              format: 'YYYY-MM-DD',
              icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down'
              }
            }).find('input:first').on('blur', function () {
              console.log('Calendar test');
              // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
              // update the format if it's yyyy-mm-dd
              let date: any = parseDate($(this).val());

              if (!isValidDate(date, '')) {
                // create date based on momentjs (we have that)
                date = moment().format('YYYY-MM-DD');
              }

              $(this).val(date);
              });

          }

          const isValidDate = function (value, format) {
            format = format || false;
            // lets parse the date to the best of our knowledge
            if (format) {
              value = parseDate(value);
            }

            const timestamp = Date.parse(value);

            return isNaN(timestamp) === false;
          }

          const parseDate = function (value) {
            const m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
            if (m) {
              value = m[5] + '-' + ('00' + m[3]).slice(-2) + '-' + ('00' + m[1]).slice(-2);
            }
            return value;
          }

          bindDatePicker();
        });*/
  }
  /*calendarLoad() {
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome'
    });
    console.log('Calender test');
  }*/
  ngOnInit() {
    console.log('Id: ' + this.auth.currentUser.id);

    this.getUser();
    // console.log('{{email}}: ', this.email);
    if (!this.abort) {
      this.getPerson();
      this.getPersonPhone();
      this.getUserAddress();
    }
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.data = res;
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
  }

  getUserAddress() {
    this.userService.getUserAddress(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.address = res.addresses;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserAddress: ' + JSON.stringify(res));
        console.log('status getUserAddress: ' + res.id + ' Message: ' + res.addresses.line1);
      },
      error => console.log('Get getUserAddress error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }

  getUserAddress_perID() {
    this.userService.getUserAddress_id(this.auth.currentUser.id, this.address.id).subscribe(
      // data => this.user = data,
      res => {
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserAddress_ID: ' + JSON.stringify(res));
        console.log('status getUserAddress_ID: ' + res.id + ' Message: ' + res.addresses.line1);
      },
      error => console.log('Get getUserAddress_ID error: ', error),
      () => this.isLoading = false
    );
}
  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  onCancel() {
    // this.router.navigate(['/login']);
    this.divPasswordFlag = false;
  }

/*
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public today(): void {
    this.dt = new Date();
  }

  public d20090824(): void {
    this.dt = new Date(2009, 7, 24);
  }

  public disableTomorrow(): void {
    this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
  }

  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      const dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (const event of this.events) {
        const currentDay = new Date(event.date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }

    return '';
  }

  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  public open(): void {
    this.opened = !this.opened;
  }

  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }

  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }
*/

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
        this.showDivreset = false;
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
          this.showDivreset = true;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.showDivreset = true;

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
}


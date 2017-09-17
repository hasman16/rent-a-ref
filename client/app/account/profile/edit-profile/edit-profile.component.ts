import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as moment from 'moment';

import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { StatesService } from '../../../services/states.service';
import { UserService } from '../../../services/user.service';

import { AddressType } from '../../../shared/models/addressType';
import { PhoneType } from '../../../shared/models/phoneType';

import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  divPasswordFlag = false;
  divBioFlag = false;
  divPhoneFlag = false;

  divAddressFlag = false;
  divZoneFlag = false;
  divPaymentFlag = false;

  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';

  user = { id: '', email: '' };
  person = { id: '' };

  address: AddressType;
  addresses = [];
  phones = [];
  phone: PhoneType;
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
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '^\\d{5}(?:[ -]{1}\\d{4})?$';

  email = new FormControl('', [Validators.required, Validators.email]);

  password1 = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);
  password2 = new FormControl('', [<any>Validators.required,
  <any>Validators.minLength(6)]);

  firstname = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);
  middlenames = new FormControl('', [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);
  lastname = new FormControl('', [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);
  gender = new FormControl('', [<any>Validators.nullValidator]);
  dob = new FormControl('', [<any>Validators.nullValidator]);

  phoneNumber = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);
  phoneDescription = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]);

  line1 = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]);
  line2 = new FormControl('', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]);
  city = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);
  state = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(20), Validators.pattern(this.alphaNumericRegex)]);
  zip = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(12), Validators.pattern(this.zipRegex)]);

  acity = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]);
  astate = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(20), Validators.pattern(this.alphaNumericRegex)]);
  azip = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(12), Validators.pattern(this.alphaNumericRegex)]);
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
  public dateModel;

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent, private profileService: ProfileService,
    private userService: UserService, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService) {
    this.subscribeToParams(route);
  }

  subscribeToParams(route) {

    this.addressForm = this.formBuilder.group({
      line1: this.line1,
      line2: this.line2,
      city: this.city,
      state: this.state,
      zip: this.zip
    });

    this.bioForm = this.formBuilder.group({
      firstname: this.firstname,
      middlenames: this.middlenames,
      lastname: this.lastname,
      gender: this.gender,
      dob: this.dateModel
    });

    this.passwordForm = this.formBuilder.group({
      password1: this.password1,
      password2: this.password2
    });

    this.phoneForm = this.formBuilder.group({
      number: this.phoneNumber,
      description: this.phoneDescription
    });

    this.zoneForm = this.formBuilder.group({
      city: this.acity,
      state: this.astate,
      zip: this.azip
    });

    this.paymentForm = this.formBuilder.group({
      paypalFlag: this.paypalFlag,
      paypalinfo: this.paypalinfo,
      checkFlag: this.checkFlag,
      ccFlag: this.ccFlag,
      ccinfo: this.ccinfo
    });

    route.queryParams.subscribe(
      data => {
        this.resetDivs();
        this.user = this.profileService.getData();

        if (data['divPassword'] === 'password') {
          this.divPasswordFlag = true;
          this.showDivreset = true;
        } else if (data['divBio'] === 'bio') {
          this.divBioFlag = true;
          this.showDivbio = true;
          this.person = this.profileService.getPerson();
          this.selectedValue = this.person['gender'];
        } else if (data['divPhone'] !== undefined) {
          this.createPhoneForm(data);
        } else if (data['divAddress'] !== undefined) {
          this.createAddressForm(data);
        } else if (data['divZone'] === 'zone') {
          this.divZoneFlag = true;
          this.showDivZone = true;
        } else if (data['divPayment'] === 'payment') {
          this.divPaymentFlag = true;
          this.showDivPayment = true;
        }
      });
  }

  createAddressForm(data) {
    this.addresses = this.profileService.getAddresses();

    let addressId = Number(data['divAddress']);
    let address = this.addresses.find(function(address) {
      return Number(address.id) === addressId;
    });

    this.address = new AddressType(address);

    this.addressForm.setValue({
      line1: this.address.line1,
      line2: this.address.line2,
      city: this.address.city,
      state: this.address.state,
      zip: this.address.zip
    });

    this.divAddressFlag = true;
    this.showDivAddress = true;
  }

  createPhoneForm(data) {
    this.phones = this.profileService.getPhones();

    let phoneId = Number(data['divPhone']);
    let phone = this.phones.find(function(phone) {
      return Number(phone.id) === phoneId;
    });

    this.phone = new PhoneType(phone);

    this.phoneForm.setValue({
      number: this.phone.number,
      description: this.phone.description
    });

    this.divPhoneFlag = true;
    this.showDivPhone = true;
  }

  ngOnInit() {
    this.states = this.statesService.getStates();
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  onCancel() {
    this.resetDivs();
  }

  resetDivs() {
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

  callSuccess(res) {
    console.log('callSuccess');
    this.toast.setMessage(res.message, 'success');
    this.onCancel();
  }

  callFailure(err: HttpErrorResponse, message = 'This email address does not exists') {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toast.setMessage(message, 'danger');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }

    this.resetDivs();
  }

  onPasswordSubmit() {
    this.userService.changepassword(this.passwordForm.value, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPasswordFlag = true;
        this.showDivreset = true;
      }
    );
  }

  onBioSubmit() {
    let bio = Object.assign({}, this.bioForm.value);
    bio.dob = Number(bio.dob.epoc) * 1000;

    this.userService.updatePerson(bio, this.person.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divBioFlag = true;
        this.showDivbio = true;
      }

    );
  }

  onAddressSubmit() {
    if (Number(this.address.id) === 0) {
      this.createAddress();
    } else {
      this.updateAddress();
    }
  }

  createAddress() {
    this.userService.createAddress(this.addressForm.value, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divAddressFlag = true;
        this.showDivAddress = true;
      }
    );
  }

  updateAddress() {
    this.userService.updateAddress(this.addressForm.value, this.user.id, this.address.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divAddressFlag = true;
        this.showDivAddress = true;
      }
    );
  }

  onPhoneSubmit() {
    if (Number(this.phone.id) === 0) {
      this.createPhone();
    } else {
      this.updatePhone();
    }
  }

  createPhone() {
    this.userService.createPhone(this.phoneForm.value, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPhoneFlag = true;
        this.showDivPhone = true;
      }
    );
  }

  updatePhone() {
    this.userService.updatePhone(this.phoneForm.value, this.user.id, this.phone.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPhoneFlag = true;
        this.showDivPhone = true;
      }
    );
  }

  onZoneSubmit() {
    /*
    this.userService.updateZone(this.zoneForm.value, this.user.id).subscribe(
      this.callSuccess,
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divZoneFlag = true;
        this.showDivZone = true;
      }
    );*/
  }

  onPaymentSubmit() {
    this.userService.updatePayment(this.paymentForm.value, this.user).subscribe(
      this.callSuccess,
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPaymentFlag = true;
        this.showDivPayment = true;
      }
    );
  }

  setClassEmail1() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
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
    return { 'has-danger': !this.phoneNumber.pristine && !this.phoneNumber.valid };
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

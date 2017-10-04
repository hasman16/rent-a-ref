import { Component, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as moment from 'moment';

import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { StatesService } from '../../../services/states.service';
import { UserService } from '../../../services/user.service';

import { AddressType } from '../../../shared/models/addressType';
import { compareFields } from '../../../shared/compareFields';
import { PhoneType } from '../../../shared/models/phoneType';
import { BioType } from '../../../shared/models/bioType';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  messages: object = {
    'password': 'Change Your Password',
    'bio': 'Update Your Information',
    'phone': 'Update Your Phones',
    'address': 'Update Your Address',
    'zone': 'Update Your Available Zone',
    'payment': 'Update Your Payment'
  };

  password: '';
  message = '';
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

  user = { id: '', email: '', can_referee: '', can_organize: '', status: '' };
  // person = { id: '', firstname: '', middlenames: '', lastname: '', dob: '' };

  person: BioType;

  address: AddressType;
  addresses = [];
  phones = [];
  phone: PhoneType;
  area: AddressType;
  areas = [];

  isLoading = true;

  states;
  abort = false;

  public showDivreset = false;
  public showDivbio = false;
  public showDivPhone = false;
  public showDivAddress = false;
  public showDivZone = false;
  public showDivPayment = false;

  passwordForm: FormGroup;
  paymentForm: FormGroup;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '^\\d{5}(?:[ -]{1}\\d{4})?$';

  email = new FormControl('', [Validators.required, Validators.email]);

  paypalinfo = new FormControl('', [<any>Validators.nullValidator]);
  check = new FormControl('', [<any>Validators.nullValidator]);
  ccinfo = new FormControl('', [<any>Validators.nullValidator]);

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent, private profileService: ProfileService,
    private userService: UserService, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService) {
    this.subscribeToParams(route);
  }

  subscribeToParams(route) {
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
        let action = '';
        if (data['divPassword'] === 'password') {
          action = 'password';
          this.divPasswordFlag = true;
          this.showDivreset = true;
        } else if (data['divBio'] === 'bio') {
          action = 'bio';
          this.person = this.profileService.getPerson();
          this.divBioFlag = true;
          this.showDivbio = true;
        } else if (data['divPhone'] !== undefined) {
          action = 'phone';
          this.createPhoneForm(data);
        } else if (data['divAddress'] !== undefined) {
          action = 'address';
          this.createAddressForm(data);
        } else if (data['divZone'] !== undefined) {
          action = 'zone';
          this.createZoneForm(data);
        } else if (data['divPayment'] === 'payment') {
          action = 'payment';
          this.divPaymentFlag = true;
          this.showDivPayment = true;
        }
        this.message = this.messages[action];
      });
  }

  createAddressForm(data) {
    this.addresses = this.profileService.getAddresses();

    const addressId = Number(data['divAddress']);
    const address = this.addresses.find(function(address) {
      return Number(address.id) === addressId;
    });

    this.address = new AddressType(address);

    this.divAddressFlag = true;
    this.showDivAddress = true;
  }

  createPhoneForm(data) {
    this.phones = this.profileService.getPhones();

    const phoneId = Number(data['divPhone']);
    const phone = this.phones.find(function(phone) {
      return Number(phone.id) === phoneId;
    });

    this.phone = new PhoneType(phone);

    this.divPhoneFlag = true;
    this.showDivPhone = true;
  }

  createZoneForm(data) {
    this.areas = this.profileService.getAreas();

    const areaId = Number(data['divAddress']);
    const area = this.areas.find(function(area) {
      return Number(area.id) === areaId;
    });

    this.area = new AddressType(area);

    this.divZoneFlag = true;
    this.showDivZone = true;
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

  onPasswordSubmit(newPassword) {
    this.userService.changepassword(newPassword, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPasswordFlag = true;
        this.showDivreset = true;
      }
    );
  }

  onBioSubmit(bio) {
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

  onAddressSubmit(newAddress: AddressType) {
    if (Number(this.address.id) === 0) {
      this.createAddress(newAddress);
    } else {
      this.updateAddress(newAddress);
    }
  }

  createAddress(newAddress: AddressType) {
    this.userService.createAddress(newAddress, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divAddressFlag = true;
        this.showDivAddress = true;
      }
    );
  }

  updateAddress(newAddress: AddressType) {
    this.userService.updateAddress(newAddress, this.user.id, this.address.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divAddressFlag = true;
        this.showDivAddress = true;
      }
    );
  }

  onPhoneSubmit(newPhone: PhoneType) {
    if (Number(this.phone.id) === 0) {
      this.createPhone(newPhone);
    } else {
      this.updatePhone(newPhone);
    }
  }

  createPhone(newPhone: PhoneType) {
    this.userService.createPhone(newPhone, this.user.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPhoneFlag = true;
        this.showDivPhone = true;
      }
    );
  }

  updatePhone(newPhone: PhoneType) {
    this.userService.updatePhone(newPhone, this.user.id, this.phone.id).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divPhoneFlag = true;
        this.showDivPhone = true;
      }
    );
  }

  onZoneSubmit(newZone: AddressType) {
    this.userService.updateZone(newZone, this.user.id).subscribe(
      this.callSuccess,
      (err: HttpErrorResponse) => {
        this.callFailure(err);
        this.divZoneFlag = true;
        this.showDivZone = true;
      }
    );
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

}

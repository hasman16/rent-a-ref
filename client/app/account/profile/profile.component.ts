import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { AuthService } from '../../services/auth.service';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AddressType } from '../../shared/models/addressType';
import { PhoneType } from '../../shared/models/phoneType';

// End
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  data = {};
  user = {};
  person = {};
  addresses = [];
  dummyAddress: AddressType = new AddressType({});
  phones = [];
  dummyPhone: PhoneType = new PhoneType({});
  available = {};
  isLoading = true;
  allowEdit = false;
  middlenameFlag = false;

  abort = false;
  divPassword = false;
  editBio = false;
  editPassword = false;

  editPhone = false;
  currentPhone = 0;

  editAddress = false;
  currentAddress = 0;

  birthday ='';

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getProfile() {
    this.profileService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
        this.data = res;
        this.user = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;
        this.birthday = moment(res.person.dob).format('LL');
        if (JSON.stringify(res.person.middlenames) !== 'null') {
          this.middlenameFlag = true;
        }
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
          this.abort = true;
          this.auth.logout();
        }
      }
    );
  }

  clearEdits() {
    this.editBio = false;
    this.editPassword = false;
    this.editAddress = false;
    this.editPhone = false;
  }

  setEditAddress(id: number = 0, value: boolean = false) {
    this.clearEdits();
    this.currentAddress = id;
    this.editAddress = value;
  }

  setEditBio(value: boolean = false) {
    this.clearEdits();
    this.editBio = value;
  }

  setEditPassword(value: boolean = false) {
    this.clearEdits();
    this.editPassword = value;
  }

  setEditPhone(id: number = 0, value: boolean = false) {
    this.clearEdits();
    this.currentPhone = id;
    this.editPhone = value;
  }

  onAddressSubmit(value) {
    this.onFormCancel(false);
  }

  onBioSubmit(value) {
    this.onFormCancel(false);
  }

  onPasswordSubmit(value) {
    this.onFormCancel(false);
  }

  onPhoneSubmit(value) {
    this.onFormCancel(false);
  }

  onFormCancel(value) {
    this.clearEdits();
  }
}

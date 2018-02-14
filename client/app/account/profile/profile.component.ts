import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService, CanComponentDeactivate, ProfileService, UserService } from '../../services/index';

import { ToastComponent } from '../../shared/toast/toast.component';
//Models
import { Address, Person, Phone, Profile, User } from './../../shared/models/index';
import * as _ from "lodash";
import * as moment from 'moment';

// End
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  protected data:Profile = <Profile>{};
  protected user:User = <User>{};
  protected person:Person = <Person>{};

  protected addresses: Address[];
  protected dummyAddress: Address = <Address>{};
  protected phones: Phone[];
  protected dummyPhone: Phone = <Phone>{};
  protected available = {};
  protected isLoading = true;
  protected allowEdit = false;
  protected middlenameFlag = false;

  protected abort = false;
  protected divPassword = false;
  protected editBio = false;
  protected editPassword = false;

  protected editPhone = false;
  protected currentPhone = 0;

  protected editAddress = false;
  protected currentAddress = 0;

  protected birthday = '';

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private profileService: ProfileService,
    private userService: UserService) {
      this.addresses = [];
      this.phones = [];
   }

  ngOnInit() {
    this.getProfile();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getProfile() {
    this.isLoading = true;
    this.profileService.getProfile(this.auth.currentUser.id).subscribe(
      (profile: Profile) => {
        this.data = profile;
        this.user = {
          id: String(profile.id),
          email: profile.email,
          authorization: String(profile.authorization),
          firstname: profile.person.firstname,
          lastname: profile.person.lastname,
          role: '',
          person_id: String(profile.person.id),
          can_referee: profile.can_referee,
          can_organize: profile.can_organize,
          status: profile.status
        } as User;
        this.person = profile.person;
        this.addresses = _.sortBy(profile.addresses, 'id');
        this.phones = _.sortBy(profile.phones, 'id');
        this.birthday = moment(profile.person.dob).format('LL');
        if (JSON.stringify(profile.person.middlenames) !== 'null') {
          this.middlenameFlag = true;
        }
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
    this.isLoading = false;
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

  onAddressSubmit(res) {
    this.onFormSave(res);
  }

  onBioSubmit(res) {
    this.onFormSave(res);
  }

  onPasswordSubmit(res) {
    this.onFormSave(res);
  }

  onPhoneSubmit(res) {
    this.onFormSave(res);
  }

  onFormSave(res: any) {
    if (res.action === 'show_overlay') {
      this.isLoading = true;
    } else if (res.action === 'save_success') {
      this.onFormCancel(false);
      this.getProfile();
    } else if (res.action === 'save_failure') {
      this.isLoading = false;
    } else {
      this.onFormCancel(false);
    }
  }

  onFormCancel(value) {
    this.clearEdits();
  }
}

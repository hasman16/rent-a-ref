import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { StatesService } from '../../../services/states.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  person = {};
  phone = {};
  address = { id: '', line1: '', line2: '', city: '', state: '', zip: '' };
  addresses = [];
  phones = [];
  isLoading = true;
  model;
  states;

  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private statesService: StatesService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.states = this.statesService.getStates();
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
        this.data = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;

        this.address = this.addresses[0];
        this.phone = this.phones[0];
      },
      error => this.auth.logout(),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }
}

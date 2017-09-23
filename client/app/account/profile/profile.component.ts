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

// End
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  person = {};
  addresses = [];
  phones = [];
  available = { };
  isLoading = true;
  allowEdit = false;
  middlenameFlag = false;
  //edit = 'account/profile';
  //id = this.auth.currentUser.id;
  abort = false;
  divPassword = false;

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

  onEdit() {
    this.route.queryParams
      .subscribe(
      (queryParams: Params) => {
        this.divPassword = queryParams['divPassword'] === 'password' ? true : false;
      }
    );
    this.router.navigate(['edit-profile'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}

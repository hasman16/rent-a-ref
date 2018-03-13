import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import {
  AuthService,
  CanComponentDeactivate,
  ProfileService,
  UserService
} from '../services/index';
import {
  Address,
  Person,
  Phone,
  Profile,
  User
} from './../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'rar-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, CanComponentDeactivate {
  protected data: Profile = <Profile>{};
  protected user: Profile = <Profile>{};
  protected users: Profile[] = [];
  protected person: Person = <Person>{};
  protected addresses: Address[] = [];
  protected phones: Phone[] = [];
  protected available: any = {};
  protected middlenameFlag: boolean = false;
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.isLoading = false;
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
          console.log(
            'A client-side or network error occurred for the Profile',
            this.auth.loggedIn
          );
        } else {
          console.log(
            'The backend returned an unsuccessful response code for the profile',
            this.auth.loggedIn
          );
        }
        this.isLoading = false;
      }
    );
  }

  onOfficials() {
    this.router.navigate(['/officials']);
  }

  onAssigning() {
    this.router.navigate(['/games']);
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }

  deleteUser(user) {
    this.userService
      .deleteUser(user)
      .subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
  }

  callSuccess(res) {
    this.toast.setMessage(res.message, 'success');
    this.users = res;
    this.isLoading = false;
    console.log('this.users: ', this.users);
    // this.onCancel();
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toast.setMessage(message, 'danger');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

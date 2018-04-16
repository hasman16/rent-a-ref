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
    const currentUser: User = this.auth.getCurrentUser();

    this.profileService.getProfile(currentUser.id).subscribe(
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
        this.callFailure(err);
        this.isLoading = false;
      }
    );
  }

  onOfficials() {
    this.router.navigate(['admin/officials']);
  }

  onAssigning() {
    this.router.navigate(['admin/games']);
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
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

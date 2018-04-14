import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  AuthService,
  CanComponentDeactivate,
  UserService
} from '../../services/index';
import { User } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'rar-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, CanComponentDeactivate {
  protected users: User[] = [];
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected currentUser: User = <User>{};

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.getUsers();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getUsers() {
    this.userService
      .getUsers()
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  updateUser() {
    this.userService
      .getUsers()
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  deleteUser(user) {
    this.userService
      .deleteUser(user)
      .subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        (err: HttpErrorResponse) => this.callFailure(err),
        () => this.getUsers()
      );
  }

  callSuccess(res) {
    this.toast.setMessage(res.message, 'success');
    this.users = _.isArray(res) ? _.cloneDeep(res) : [];
    this.isLoading = false;
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

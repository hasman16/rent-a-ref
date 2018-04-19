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
  protected sortOrder: string = 'asc';
  protected currentUser: User = <User>{};

  protected columns: any[] = [
    { name: 'Email', prop: 'email' },
    { name: 'Organizer', prop: 'can_organize' },
    { name: 'Referee', prop: 'can_referee' },
    { name: 'Status', prop: 'status' }
  ];
  protected rows: any[];

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const users: User[] = this.route.snapshot.data.users;
    this.currentUser = this.auth.getCurrentUser();
    this.users = _.isArray(users) ? _.cloneDeep(users) : [];
    this.rows = this.users;
    if (this.users.length === 0) {
      //this.getUsers();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getUsers() {
    const paramsObj = {
      //can_referee: 'pending'
    };
    const query = {
      params: paramsObj
    };
    this.userService
      .getUsers(query)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  sortTable(predicate: string = ''): void {
    const users: User = _.cloneDeep(this.users);
    predicate = predicate == 'organize' ? 'can_organize' : predicate;
    predicate = predicate == 'referee' ? 'can_referee' : predicate;
    this.users = _.orderBy(this.users, predicate, this.sortOrder);
    this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
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

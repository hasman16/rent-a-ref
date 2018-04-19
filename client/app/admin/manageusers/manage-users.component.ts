import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  AuthService,
  CanComponentDeactivate,
  UserService
} from '../../services/index';
import { Page, User } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

interface Sorts {
  dir: string;
  prop: string;
}

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
  protected page: Page;

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
  ) {
    this.resetPaging();
  }

  ngOnInit() {
    const users: User[] = this.route.snapshot.data.users;
    this.currentUser = this.auth.getCurrentUser();
    this.users = _.isArray(users) ? _.cloneDeep(users) : [];
    this.rows = this.users;
    this.getUsers(this.page);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getUsers(params: any) {
    this.isLoading = true;
    this.userService
      .getUsers(params)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  onSort(sorting): void {
    const sorter: Sorts = <Sorts>sorting.sorts[0];
    this.page.order = sorter.dir;
    this.page.sortby = sorter.prop;
    this.page.offset = 0;
  }

  setPage(paging): void {
    this.page.offset = paging.offset;
    this.getUsers(this.page);
  }

  resetPaging(): void {
    this.page = <Page>{
      offset: 0,
      limit: 5,
      total_elements: 0,
      total_pages: 0,
      sortby: '',
      order: '',
      search: ''
    };
  }

  updateUser() {
    this.userService
      .getUsers(this.page)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      (err: HttpErrorResponse) => this.callFailure(err),
      () => {
        this.resetPaging();
        this.getUsers(this.page);
      }
    );
  }

  callSuccess(res) {
    this.toast.setMessage(res.message, 'success');
    this.users = _.isArray(res.rows) ? _.cloneDeep(res.rows) : [];
    this.page.total_elements = res.count || 0;
    this.page.total_pages = this.page.total_elements / this.page.limit;
    this.isLoading = false;
    console.log(':::', res.count, this.users, this.page.total_pages);
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
    this.isLoading = false;
  }
}

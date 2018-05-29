import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  PagingService,
  UserService
} from '../../services/index';
import { Page, PagedData, Sorts, User } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'rar-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, CanComponentDeactivate {
  public users: User[] = [];
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected currentUser: User = <User>{};
  protected page: Page;
  protected selected: any[] = [];
  protected columns: any[] = [
    { name: 'Email', prop: 'email' },
    { name: 'Organizer', prop: 'can_organize' },
    { name: 'Referee', prop: 'can_referee' },
    { name: 'Status', prop: 'status' }
  ];

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    private pagingService: PagingService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
  }

  ngOnInit() {
    const pagedData: PagedData = this.route.snapshot.data.userData;
    this.processPagedData(pagedData);
    this.isLoading = false;
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
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getUsers(this.page);
  }

  setPage(paging): void {
    this.page.offset = paging.offset;
    this.getUsers(this.page);
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
        this.page = this.pagingService.getDefaultPager();
        this.getUsers(this.page);
      }
    );
  }

  processPagedData(data: PagedData): void {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    this.page = page;
    this.users = newData;
  }

  callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('users data retrieved', 'success');
    this.isLoading = false;
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
    this.isLoading = false;
  }

  public onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
  }

  public onActivate(event): void {
    console.log('Activate Event', event);
  }
}

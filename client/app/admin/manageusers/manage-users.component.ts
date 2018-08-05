import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../../abstract/abstract.component';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  PagingService,
  UserService
} from '../../services/index';
import { Page, PagedData, Sorts, User } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

@Component({
  selector: 'rar-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends AbstractComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  public users: User[] = [];
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected currentUser: User = <User>{};
  public placeholder: string = 'Type to filter by email ...';
  public defaultImage: string = 'assets/images/avatar2.png';
  public selectedUser: any;
  public viewProfile: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
  }

  ngOnInit() {
    this.viewProfile = false;
    this.initialize();
    this.searchAttribute = 'email|';
    const pagedData: PagedData = this.route.snapshot.data.userData;
    this.processPagedData(pagedData);
  }

  ngOnDestroy() {
    this.tearDown();
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  public getImageAddress(id): string {
    const user = _.find(this.users, user => user.id == id);
    const url = _.get(user, 'images[0].location', '');
    return url;
  }

  public onSelect({ selected }): void {
    this.selectedUser = _.head(selected);
    this.viewProfile = true;
  }

  public backToList(): void {
    this.viewProfile = false;
  }

  public getUsers(params: any) {
    this.isLoading = true;
    this.userService
      .getUsersPeople(params)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  protected getData(data: Page): void {
    this.getUsers(data);
  }

  public updateUser() {
    this.userService
      .getUsersPeople(this.page)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      (err: HttpErrorResponse) => this.callFailure(err),
      () => {
        this.page = this.pagingService.getDefaultPager();
        this.getUsers(this.page);
      }
    );
  }

  protected processPagedData(data: PagedData): void {
    this.users = this.extraPagedData(data);
  }

  protected callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('users data retrieved', 'success');
    this.isLoading = false;
  }

  protected callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
    this.isLoading = false;
  }
}

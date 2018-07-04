import { Router, ActivatedRoute } from '@angular/router';

import { Component, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../abstract/abstract.component';

import { ToastComponent } from '../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  PagingService,
  UserService
} from '../services/index';
import { Page, PagedData, Sorts, User } from '../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

@Component({
  selector: 'rar-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent extends AbstractComponent
  implements OnInit, OnDestroy {
  @Input()
  set setMatchId(id) {
    this.match_id = id;
    this.getUsers(this.page);
  }
  public users: User[] = [];
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected currentUser: User = <User>{};
  protected match_id: string;
  public placeholder: string = 'Type to filter by email ...';
  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
  }

  ngOnInit() {
    this.initialize();
    this.searchAttribute = 'email|';
    this.getUsers(this.page);
  }

  ngOnDestroy() {
    this.tearDown();
  }

  public getUsers(params: Page) {
    let page: Page = _.cloneDeep(params);
    page.search = 'can_referee|active,' + page.search;

    this.isLoading = true;
    this.userService
      .getUsers(page)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  protected getData(data: Page): void {
    this.getUsers(data);
  }

  public officiateMatch(user_id) {
    this.userService
      .getUsers(this.page)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public viewSchedule(user_id) {
    this.userService
      .getUsers(this.page)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
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

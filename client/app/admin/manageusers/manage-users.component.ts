import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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
export class ManageUsersComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
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
  protected searchSubject: Subject<Page>;
  protected search$: Observable<Page>;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private userService: UserService,
    private pagingService: PagingService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
    this.searchSubject = new Subject();
    this.search$ = this.searchSubject.asObservable().debounceTime(1000);
  }

  ngOnInit() {
    const pagedData: PagedData = this.route.snapshot.data.userData;
    this.processPagedData(pagedData);
    this.isLoading = false;
    this.subscriptions.push(
      this.search$
        .do((page: Page) => {
          this.getUsers(_.cloneDeep(page));
        })
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  public getUsers(params: any) {
    this.isLoading = true;
    this.userService
      .getUsers(params)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public updateFilter(event): void {
    const val: string = event.target.value.toLowerCase();
    const length: number = val.length;
    if (!this.isLoading) {
      const page: Page = this.pagingService.search(this.page, 'email|' + val);
      this.page = _.cloneDeep(page);
      this.searchSubject.next(this.page);
    }
  }

  public onSort(sorting): void {
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getUsers(this.page);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getUsers(this.page);
  }

  public updateUser() {
    this.userService
      .getUsers(this.page)
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
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    this.page = page;
    this.users = newData;
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

  public onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
  }

  public onActivate(event): void {
    console.log('Activate Event', event);
  }
}

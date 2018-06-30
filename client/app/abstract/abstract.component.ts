import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../shared/toast/toast.component';
import { PagingService } from '../services/index';
import { Page, PagedData, Sorts } from './../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

export abstract class AbstractComponent {
  protected isLoading: boolean = true;
  protected page: Page;
  protected selected: any[] = [];
  protected searchSubject: Subject<Page>;
  protected search$: Observable<Page>;
  protected searchAttribute: string;
  protected delay: number = 1000;
  protected subscriptions: Subscription[] = [];

  constructor(protected pagingService: PagingService) {}

  protected initialize(): void {
    this.subscriptions = [];
    this.isLoading = false;
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
    this.searchSubject = new Subject();
    this.search$ = this.searchSubject.asObservable().debounceTime(this.delay);
    this.subscriptions.push(
      this.search$
        .do((page: Page) => {
          this.getData(_.cloneDeep(page));
        })
        .subscribe()
    );
  }

  tearDown() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public updateFilter(event): void {
    const value: string = event.target.value.toLowerCase();
    const length: number = value.length;
    if (!this.isLoading) {
      const page: Page = this.pagingService.search(
        this.page,
        this.searchAttribute + value
      );
      this.page = _.cloneDeep(page);
      this.searchSubject.next(this.page);
    }
  }

  public onSort(sorting): void {
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getData(this.page);
  }

  public onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
  }

  public onActivate(event): void {
    console.log('Activate Event', event);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getData(this.page);
  }

  protected extraPagedData(data: PagedData): any[] {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    this.page = page;
    return newData;
  }

  protected abstract processPagedData(data: PagedData): void;
  protected abstract getData(data: Page): void;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  EventsService,
  PagingService
} from './../../services/index';

import {
  Address,
  BaseModel,
  Game,
  Page,
  PagedData,
  Phone,
  Option,
  Organization,
  State,
  Sorts,
  Sport,
  User
} from '../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'rar-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;

  protected columns: any[] = [
    { name: 'Event Name', prop: 'event_name' },
    { name: 'Event Date', prop: 'event_date' },
    { name: 'Venue', prop: 'venue_name' },
    { name: 'Status', prop: 'status' }
  ];
  protected sports: Option[];
  public games: Game[] = [];
  protected page: Page;
  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private eventsService: EventsService,
    private pagingService: PagingService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
  }

  ngOnInit() {
    const pagedData: PagedData = this.route.snapshot.data.eventsData;
    this.processPagedData(pagedData);
    this.isLoading = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  onSort(sorting): void {
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getEvents(this.page);
  }

  setPage(paging): void {
    this.page.offset = paging.offset;
    this.getEvents(this.page);
  }

  getEvents(params: any) {
    this.isLoading = true;
    this.eventsService
      .getAllGames(params)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  updateEvents() {}

  deleteEvent(user) {}

  processPagedData(data: PagedData): void {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    console.log('page:', newData);
    this.page = page;
    this.games = newData;
  }

  callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('Events data retrieved', 'success');
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

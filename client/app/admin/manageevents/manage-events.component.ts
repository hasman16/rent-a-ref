import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  EventsService,
  PagingService,
  StatesService
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
  public sports: Option[];
  public states: Option[];
  public games: Game[] = [];
  protected page: Page;
  public isEditing: boolean = false;
  protected selected: any[] = [];
  protected selectedTab: string = 'editEvent';

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private eventsService: EventsService,
    private pagingService: PagingService,
    protected statesService: StatesService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
  }

  ngOnInit() {
    const [gamesData, sportsData]: [
      PagedData,
      PagedData
    ] = this.route.snapshot.data.eventsData;
    this.sports = _(sportsData.rows)
      .map((sport: Sport): Option => {
        return <Option>{
          label: sport.name,
          value: sport.id
        };
      })
      .value();

    this.states = this.statesService.getStatesProvinces();
    this.processPagedData(gamesData);
    this.isLoading = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  public isSelectedTab(tab: string): boolean {
    return this.selectedTab === tab;
  }

  public switchToTab($event, tab: string): void {
    $event.preventDefault();
    this.selectedTab = tab;
  }

  public onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
    this.isEditing = true;
  }

  public onActivate(event): void {
    console.log('Activate Event', event);
  }

  public onSort(sorting): void {
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getEvents(this.page);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getEvents(this.page);
  }

  public editEvent(game): void {
    console.log('edit events:', game);
  }

  public getEvents(params: any) {
    this.isLoading = true;
    this.eventsService
      .getAllGames(params)
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public updateEvents() {}

  public deleteEvent(user) {
    console.log('delete:', user);
  }

  public processPagedData(data: PagedData): void {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    console.log('page:', newData);
    this.page = page;
    this.games = newData;
  }

  protected callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('Events data retrieved', 'success');
    this.isLoading = false;
  }

  protected callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

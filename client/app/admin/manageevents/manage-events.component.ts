import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  EventsService,
  PagingService,
  StatesService
} from './../../services/index';
import { EventsComponentService } from './../../organize/events/events-component.service';
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
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

enum TabState {
  editEvent,
  addMatch
}

@Component({
  selector: 'rar-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageEventsComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  public sports: Option[];
  public states: Option[];
  public games: Game[] = [];
  protected page: Page;
  public isEditing: boolean = false;
  public model: any = {};
  protected selected: any[] = [];
  protected selectedTab: TabState = TabState.editEvent;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private eventsService: EventsService,
    private pagingService: PagingService,
    protected eventsComponentService: EventsComponentService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
  }

  ngOnInit() {
    const [gamesData, sportsData]: [
      PagedData,
      PagedData
    ] = this.route.snapshot.data.eventsData;
    this.sports = this.eventsComponentService.mapSportsAsOptions(
      sportsData.rows
    );
    this.states = this.eventsComponentService.getStatesProvinces();
    this.setSelectedTab(TabState.editEvent);
    this.processPagedData(gamesData);
    this.isLoading = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  public switchToEditEvent($event): void {
    $event.preventDefault();
    this.setSelectedTab(TabState.editEvent);
  }

  public isTabEditEvent(): boolean {
    return this.selectedTab === TabState.editEvent;
  }

  public switchToAddMatch($event): void {
    $event.preventDefault();
    this.setSelectedTab(TabState.addMatch);
  }

  public isTabAddMatch(): boolean {
    return this.selectedTab === TabState.addMatch;
  }

  public setSelectedTab(tab: TabState): void {
    this.selectedTab = tab;
  }

  public onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
    const game = _.cloneDeep(_.head(selected));
    this.isEditing = true;
    this.editEvent(game);
  }

  public editEvent(game: Game): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.eventsComponentService
        .getEvent(game.id)
        .take(1)
        .finally(() => {
          this.cd.markForCheck();
        })
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.setSelectedTab(TabState.editEvent);
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.isEditing = false;
          }
        );
    }
  }

  public formatDate(id): string {
      return this.pagingService.formatDate(id, this.games);
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

  public getEvents(params: any) {
    this.isLoading = true;
    this.eventsService
      .getAllGames(params)
      .finally(() => {
        this.cd.markForCheck();
      })
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public submitUpdateEvent(model: any): void {
    this.eventsComponentService
      .updateGameAddress(model)
      .finally(() => {
        this.cd.markForCheck();
      })
      .subscribe(
        (game: Game) => {
          this.toast.setMessage('Event updated.', 'info');
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to update new event.')
      );
  }

  public deleteEvent(user) {
    console.log('delete:', user);
  }

  public submitEvent(model: Game): void {
    const game: Game = this.eventsComponentService.convertModelToGame(model);

    if (_.isNil(model.id) || !model.id) {
      //this.submitNewEvent(game);
    } else {
      this.submitUpdateEvent(game);
      // this.setEventsMode();
    }
  }

  protected processPagedData(data: PagedData): void {
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

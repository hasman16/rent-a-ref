import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventsComponentService } from './events-component.service';
import { ToastComponent } from './../../shared/toast/toast.component';
import {
  AuthService,
  PagingService,
  UserService
} from './../../services/index';
import {
  Address,
  BaseModel,
  Game,
  Phone,
  Option,
  Page,
  PagedData,
  Organization,
  State,
  Sport
} from './../../shared/models/index';

import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

enum ViewState {
  noEvents,
  listEvents,
  editEvent,
  payForEvent
}

@Component({
  selector: 'rar-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: Option[];

  protected model: any = {};
  protected prices: any[] = [];

  protected titles: string[] = [
    'Event Name',
    'Event Date',
    'Venue',
    'Status',
    '',
    ''
  ];
  protected sports: Option[];
  public games: Game[] = [];
  protected page: Page;
  protected selected: any[] = [];
  protected isLoading: boolean = false;

  protected organization_id: string = '';
  public buttonText: string = 'Create';
  public viewState: ViewState = ViewState.noEvents;

  constructor(
    private cd: ChangeDetectorRef,
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected eventsComponentService: EventsComponentService,
    private pagingService: PagingService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
    this.route.params.subscribe(params => {
      this.organization_id = params['organization_id'];
    });
  }

  public ngOnInit() {
    const gameData: PagedData = _.cloneDeep(this.route.snapshot.data.games);
    this.processPagedData(gameData);

    this.sports = this.eventsComponentService.mapSportsAsOptions(
      this.route.snapshot.data.sportsData.rows
    );

    this.states = this.eventsComponentService.getStatesProvinces();

    this.setEventsMode();
  }

  public formatDate(dateString: string): string {
    return moment(dateString).format('LL');
  }

  public processPagedData(data: PagedData): void {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    console.log('pagex:', newData);
    this.page = page;
    this.games = newData;
  }

  public onSelect(selected): void {
    console.log('Select Game', selected, this.selected);
    //const game = _.cloneDeep(_.head(selected));
    //this.isEditing = true;
    //this.editEvent(game);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getEvents(this.page);
  }

  public setEventsMode(): void {
    this.isLoading = false;
    if (_.isArray(this.games) && this.games.length > 0) {
      this.viewState = ViewState.listEvents;
    } else {
      this.viewState = ViewState.noEvents;
    }
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noEvents':
        result = this.viewState == ViewState.noEvents;
        break;
      case 'listEvents':
        result = this.viewState == ViewState.listEvents;
        break;
      case 'editEvent':
        result = this.viewState == ViewState.editEvent;
        break;
      case 'payingForEvent':
        result = this.viewState == ViewState.payForEvent;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public prepareModel(model: any): any {
    return Object.assign(
      {
        adults: false,
        teens: false,
        kids: false
      },
      model
    );
  }

  public createNewEvent(): void {
    this.model = this.prepareModel({});
    this.buttonText = 'Create';
    this.viewState = ViewState.editEvent;
  }

  protected payForEvent(game_id: string): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.eventsComponentService
        .payForEvent(game_id)
        .take(1)
        .finally(() => {
          this.isLoading = false;
        })
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.viewState = ViewState.payForEvent;
            this.cd.markForCheck();
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setEventsMode();
          }
        );
    }
  }

  public editEvents(game_id: string): void {
    console.log('editEvents:', game_id);
    if (!this.isLoading) {
      this.isLoading = true;

      this.eventsComponentService
        .getEvent(game_id)
        .take(1)
        .finally(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
        .subscribe(
          (model: any) => {
            console.log('got game:', game_id);
            this.model = _.cloneDeep(model);
            this.buttonText = 'Update';
            this.viewState = ViewState.editEvent;
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setEventsMode();
          }
        );
    }
  }

  public deleteEvent(game_id: string): void {
    console.log('deleteEvent');
  }

  public getEvents(page?: Page): void {
    this.isLoading = true;

    this.eventsComponentService
      .getOrganizationGames(this.organization_id)
      .take(1)
      .finally(() => {
        this.isLoading = false;
        this.setEventsMode();
      })
      .subscribe(
        (games: Game[]) => {
          this.games = _.cloneDeep(games);
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to retrieve Events.')
      );
  }

  public submitEvent(model: Game): void {
    const game: Game = this.eventsComponentService.convertModelToGame(model);

    if (_.isNil(model.id) || !model.id) {
      this.submitNewEvent(game);
    } else {
      this.submitUpdateEvent(game);
      this.setEventsMode();
    }
  }

  public submitNewEvent(model: Game): void {
    this.isLoading = true;
    this.eventsComponentService
      .createEvent(this.organization_id, model)
      .finally(() => {
        this.getEvents();
      })
      .subscribe(
        (game: Game) => {
          this.toast.setMessage('Event created.', 'info');
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to create new event.')
      );
  }

  public submitUpdateEvent(model: any): void {
    this.eventsComponentService
      .updateGameAddress(model)
      .finally(() => {
        this.isLoading = false;
        this.getEvents();
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

  public callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }

  public onCancel(): void {
    this.setEventsMode();
  }
}

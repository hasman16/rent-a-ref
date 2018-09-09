import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  VERSION
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractComponent } from '../../abstract/abstract.component';
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
import { PaymentState, Payment } from './../../shared/stripe/stripe-state';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

enum ViewState {
  noEvents,
  listEvents,
  editEvent,
  payForEvent,
  addMatches
}

@Component({
  selector: 'rar-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent extends AbstractComponent
  implements OnInit, OnDestroy {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: Option[];

  protected model: any = {};
  protected prices: any[] = [];

  protected sports: Option[];
  public games: Game[] = [];
  public currentGame: Game;

  public organization_id: string = '';
  public game_id: string = '';
  public buttonText: string = 'Create';
  public viewState: ViewState = ViewState.noEvents;
  public products: any[] = [];
  public plans: any[] = [];
  public placeholder: string = 'Type to filter by "Event Name" ...';

  constructor(
    private cd: ChangeDetectorRef,
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected eventsComponentService: EventsComponentService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
    this.route.params.subscribe(params => {
      this.organization_id = params['organization_id'];
    });
    console.log('VERSION:::::::::::::::', VERSION.full);
  }

  public ngOnInit() {
    this.initialize();
    this.searchAttribute = 'event_name|';
    const gameData: PagedData = _.cloneDeep(this.route.snapshot.data.games);
    this.processPagedData(gameData);

    this.sports = this.eventsComponentService.mapSportsAsOptions(
      this.route.snapshot.data.sportsData.rows
    );

    this.states = this.eventsComponentService.getStatesProvinces();

    this.setEventsMode();
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  protected processPagedData(data: PagedData): void {
    this.games = this.extractDataAndPagedData(data);
  }

  protected getData(page: Page): void {
    this.getEvents(page);
  }

  protected formatDate(date: string, timezone_id: string): string {
    return moment.tz(date, timezone_id).format('MMMM DD YYYY');
  }

  public formatStartDate(id): string {
    let item: Game = this.findGameById(id);
    return this.formatDate(item.start_date, item.timezone_id);
  }

  public setEventsMode(): void {
    this.isLoading = false;
    if (_.isArray(this.games) && this.games.length > 0) {
      this.viewState = ViewState.listEvents;
    } else {
      this.viewState = ViewState.noEvents;
    }
    this.cd.markForCheck();
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noEvents':
        result = this.viewState === ViewState.noEvents;
        break;
      case 'listEvents':
        result = this.viewState === ViewState.listEvents;
        break;
      case 'editEvent':
        result = this.viewState === ViewState.editEvent;
        break;
      case 'payingForEvent':
        result = this.viewState === ViewState.payForEvent;
        break;
      case 'addMatches':
        result = this.viewState === ViewState.addMatches;
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

  private findGameById(id): Game {
    return <Game>_.find(this.games, game => {
      return game.id === id;
    });
  }

  public goAddMatches(id: string): void {
    this.currentGame = this.findGameById(id);
    this.viewState = ViewState.addMatches;
    this.cd.markForCheck();
  }

  public setSelectedTab($event: Event, tab: ViewState): void {
    $event.preventDefault();
    this.viewState = tab;
    this.cd.markForCheck();
  }

  public switchToAddMatch($event): void {
    this.setSelectedTab($event, ViewState.addMatches);
  }

  public switchToEditEvent($event) {
    this.setSelectedTab($event, ViewState.listEvents);
  }

  public hasPaid(id: string): boolean {
    let game: Game = this.findGameById(id);
    return game && game.status === 'pending' ? false : true;
  }

  public paymentState(payment: Payment): void {
    if (payment.paymentState === PaymentState.PaymentSuccess) {
      this.getEvents(this.page);
    }
  }

  public goPayForEvent(game_id: string): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.eventsComponentService
        .getPreparedEventForPayment(game_id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.game_id = game_id;
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
    if (!this.isLoading) {
      this.isLoading = true;

      this.eventsComponentService
        .getEvent(game_id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
            this.cd.markForCheck();
          })
        )
        .subscribe(
          (model: any) => {
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

  public getEvents(page: Page = null): void {
    this.isLoading = true;

    this.eventsComponentService
      .getOrganizationGames(this.organization_id, page)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.setEventsMode();
        })
      )
      .subscribe(
        (data: PagedData) => {
          this.processPagedData(data);
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
    }
  }

  public submitNewEvent(model: Game): void {
    this.isLoading = true;
    this.eventsComponentService
      .createEvent(this.organization_id, model)
      .pipe(
        finalize(() => {
          this.getEvents();
        })
      )
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
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.getEvents();
          this.cd.markForCheck();
        })
      )
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

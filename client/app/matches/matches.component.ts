import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Input,
  Output
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractComponent } from '../abstract/abstract.component';

import { ToastComponent } from '../shared/toast/toast.component';
import {
  AuthService,
  MatchService,
  OrganizeService,
  StatesService,
  UserService,
  PagingService
} from '../services/index';
import {
  Address,
  BaseModel,
  Phone,
  Game,
  Match,
  Option,
  Organization,
  Page,
  PagedData,
  Profile,
  State,
  User
} from '../shared/models/index';

import {
  AlertModalService,
  AlertState,
  AlertButtonState
} from '../shared/alert-modal/index';

import { Observable, Subscription, Subject } from 'rxjs';
import { finalize, map, switchMap, take } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

enum ViewState {
  noMatches,
  listMatches,
  editMatch,
  assignOfficials
}

@Component({
  selector: 'rar-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent extends AbstractComponent implements OnInit {
  @Input('model')
  set setGame(game: Game) {
    this.game = _.cloneDeep(game);
    this.cd.markForCheck();
  }
  @Input('states')
  set setStates(states) {
    this.states = _.cloneDeep(states);
  }
  private matches: any[] = [];
  private viewState: ViewState = ViewState.noMatches;
  public isLoading: boolean = false;
  private game: Game = <Game>{};
  public model: any = {};
  public states: Option[] = [];
  public delete_id: string;
  public match_id: string = '0';
  public currentMatch: Match = <Match>{};

  constructor(
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private matchService: MatchService,
    private toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private alertModalService: AlertModalService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
  }

  ngOnInit() {
    this.initialize();
    this.searchAttribute = 'match_name|';
    this.getAllMatchesByGame(this.game.id, this.page);
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  public getAllMatchesByGame(game_id: string, page: Page): void {
    this.matchService
      .getAllMatchesByGame(game_id, page)
      .pipe(
        map((data: PagedData) => {
          data.rows = _.map(data.rows, match => {
            match.isTimeLocked = !this.pagingService.isNotTimeLocked(match);
            return match;
          });

          return data;
        }),
        finalize(() => {
          this.setMatchesMode();
          this.cd.markForCheck();
        })
      )
      .subscribe(matches => {
        this.processPagedData(matches);
      });
  }

  public processPagedData(data: PagedData): void {
    this.matches = this.extractDataAndPagedData(data);
  }

  public onSelectTableRow({ selected }): void {
    console.log('Select Event', selected, this.selected);
    const match = _.cloneDeep(_.head(selected));
    //this.isEditing = true;
    //this.editEvent(game);
  }

  public backToList($event): void {
    this.viewState = ViewState.listMatches;
    this.cd.markForCheck();
    this.getAllMatchesByGame(this.game.id, this.page);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getAllMatchesByGame(this.game.id, this.page);
  }

  protected getData(data: Page): void {
    this.getAllMatchesByGame(this.game.id, data);
  }

  public formatDate(id): string {
    return this.pagingService.formatDate(id, this.matches);
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noMatches':
        result = this.viewState === ViewState.noMatches;
        break;
      case 'listMatches':
        result = this.viewState === ViewState.listMatches;
        break;
      case 'editMatch':
        result = this.viewState === ViewState.editMatch;
        break;
      case 'assignOfficials':
        result = this.viewState === ViewState.assignOfficials;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public assignOfficials(match_id: string): void {
    const match = _.find(this.matches, match => match.id === match_id);
    if (match) {
      match.isTimeLocked = !this.pagingService.isNotTimeLocked(match);
      this.viewState = ViewState.assignOfficials;
      this.match_id = match_id;
      this.currentMatch = match;
      this.cd.markForCheck();
    }
  }

  public deleteMatch(match_id): void {
    this.delete_id = match_id;
    this.alertModalService.show();
    this.alertModalService.alertSubject$
      .pipe(
        take(1),
        switchMap((state: AlertState) => {
          let observable$: Observable<any>;
          if (state.alertButtonState === AlertButtonState.Ok) {
            observable$ = this.matchService.deleteMatch(match_id);
          } else {
            let modalSubject: Subject<boolean> = new Subject<boolean>();
            observable$ = modalSubject.asObservable();
            modalSubject.next(true);
          }
          return observable$;
        }),
        finalize(() => {
          this.cd.markForCheck();
          this.getAllMatchesByGame(this.game.id, this.page);
        })
      )
      .subscribe((state: AlertState) => {
        console.log('state is:', state);
      });
  }

  public createNewMatch(): void {
    const game: any = _.cloneDeep(this.game);
    const timeZoneDate = moment.tz(game.date, game.timezone_id);
    const matchDate: string = timeZoneDate.format('YYYY-MM-DD');
    const matchTime: string = timeZoneDate.format('HH:mm:ss');

    this.model = {
      venue_name: game.venue_name,
      date: matchDate,
      time: matchTime,
      line1: game.line1,
      line2: game.line2,
      city: game.city,
      state: game.state,
      zip: game.zip
    };
    this.viewState = ViewState.editMatch;
    this.cd.markForCheck();
  }

  convertMatchToModel(match: Match): any {
    const timeZoneDate = moment.tz(match.date, match.timezone_id);
    const matchDate: string = timeZoneDate.format('YYYY-MM-DD');
    const matchTime: string = timeZoneDate.format('HH:mm:ss');

    const address: Address = match.address;
    return {
      id: match.id,
      match_name: match.match_name,
      age: match.age,
      status: match.status,
      venue_name: match.venue_name,
      date: matchDate,
      time: matchTime,
      referees: match.referees,
      sport_id: match.sport_id,
      address_id: match.address_id,
      game_id: match.game_id,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip
    };
  }

  public editMatch(match_id): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.matchService
        .getMatch(match_id)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cd.markForCheck();
          })
        )
        .subscribe(
          (match: Match) => {
            this.model = this.convertMatchToModel(match);
            this.viewState = ViewState.editMatch;
          },
          () => {
            this.toast.setMessage(
              `Failed to load match ${match_id}.`,
              'danger'
            );
          }
        );
    }
  }

  public submitMatch(model): void {
    if (_.isNil(model.id) || !model.id) {
      this.submitNewMatch(model);
    } else {
      this.submitUpdateMatch(model);
    }
  }

  protected submitUpdateMatch(model): void {
    const match: Match = this.convertModelToMatch(model);
    this.isLoading = true;
    this.matchService
      .updateMatch(match)
      .pipe(
        finalize(() => {
          this.getAllMatchesByGame(this.game.id, this.page);
        })
      )
      .subscribe(
        (match: Match) => {
          this.toast.setMessage('Match updated.', 'info');
        },
        (err: HttpErrorResponse) => {
          this.callFailure(err, 'Failed to update match.');
        }
      );
  }

  protected submitNewMatch(model): void {
    this.isLoading = true;
    this.matchService
      .createMatch(this.game.id, this.convertModelToMatch(model))
      .pipe(
        finalize(() => {
          this.getAllMatchesByGame(this.game.id, this.page);
        })
      )
      .subscribe(
        (match: Match) => {
          this.toast.setMessage('Match created.', 'info');
        },
        (err: HttpErrorResponse) => {
          this.callFailure(err, 'Failed to create new match.');
        }
      );
  }

  public convertModelToMatch(model: any): Match {
    const dateString: string = String(model.date);
    const timeString: string = String(model.time);

    return <Match>{
      id: model.id,
      match_name: model.match_name,
      date: dateString,
      time: timeString,
      referees: model.referees,
      venue_name: model.venue_name,
      status: model.status || 'pending',
      age: model.age,
      address: {
        id: model.address_id,
        line1: model.line1,
        line2: model.line2,
        city: model.city,
        state: model.state,
        zip: model.zip
      }
    };
  }

  public setMatchesMode(): void {
    this.isLoading = false;

    if (_.isArray(this.matches) && this.matches.length > 0) {
      this.viewState = ViewState.listMatches;
    } else {
      this.viewState = ViewState.noMatches;
    }
  }

  public callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

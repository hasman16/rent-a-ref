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

import { ToastComponent } from '../shared/toast/toast.component';
import {
  AuthService,
  MatchService,
  OrganizeService,
  StatesService,
  UserService
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

import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

enum ViewState {
  noMatches,
  listMatches,
  editMatch
}

@Component({
  selector: 'rar-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {
  @Input('model')
  set setGame(game: Game) {
    this.game = _.cloneDeep(game);
  }
  @Input('states')
  set setStates(states) {
    this.states = _.cloneDeep(states);
  }
  private subscriptions: Subscription[] = [];
  private matches: any[] = [];
  private viewState: ViewState = ViewState.noMatches;
  public isLoading: boolean = false;
  private game: Game = <Game>{};
  public model: any = {};
  public states: Option[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private matchService: MatchService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setMatchesMode();
    this.subscriptions.push(
      this.matchService.getMatches().subscribe(matches => {
        this.setMatchesMode();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noMatches':
        result = this.viewState == ViewState.noMatches;
        break;
      case 'listMatches':
        result = this.viewState == ViewState.listMatches;
        break;
      case 'editMatch':
        result = this.viewState == ViewState.editMatch;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public createNewMatch(): void {
    this.model = {};
    this.viewState = ViewState.editMatch;
  }

  public submitEvent(model): void {
    console.log('submintEvent:', model);
    this.matchService
      .createMatch(this.game.id, this.convertModelToMatch(model))
      .subscribe(
        (match: Match) => {
          this.toast.setMessage('Match created.', 'info');
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to create new match.'),
        () => {
          //this.getEvents();
          this.cd.markForCheck();
        }
      );
  }

  public convertModelToMatch(model: any): Match {
    const dateString: string = String(model.match_date);
    const matchDate: number = Number(new Date(dateString).getTime());

    return <Match>{
      id: model.id,
      match_date: matchDate,
      referees: model.referees,
      venue_name: model.venue_name,
      status: 'pending',
      age: model.age,
      address: {
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

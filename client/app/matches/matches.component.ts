import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Input
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
  private subscriptions: Subscription[] = [];
  private matches: any[] = [];
  private viewState: ViewState = ViewState.noMatches;
  public isLoading: boolean = false;
  public model: any = {};

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
        console.log('got Matches:', matches);
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

  public submitEvent(model): void {}

  public setMatchesMode(): void {
    this.isLoading = false;
    if (_.isArray(this.matches) && this.matches.length > 0) {
      this.viewState = ViewState.listMatches;
    } else {
      this.viewState = ViewState.noMatches;
    }
  }
}

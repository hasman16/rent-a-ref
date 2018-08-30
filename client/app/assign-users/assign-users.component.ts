import { Router, ActivatedRoute } from '@angular/router';

import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../abstract/abstract.component';

import { ToastComponent } from '../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  MatchService,
  PagingService,
  UserService
} from '../services/index';
import { Match, Page, PagedData, Sorts, User } from '../shared/models/index';
import { Observable, Subscription, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as _ from 'lodash';

enum ViewState {
  listReferees,
  viewSchedule
}
@Component({
  selector: 'rar-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignUsersComponent extends AbstractComponent
  implements OnInit, OnDestroy {
  @Input('match')
  set setMatch(match: Match) {
    if (match) {
      this.match = _.cloneDeep(match);
      this.match_id = this.match.id;
      if (this.page) {
        this.getUsers(this.page);
      }
    }
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  public users: User[] = [];
  public currentUser: User;
  public placeholder: string = 'Type to filter Referees by email ...';
  protected isLoading: boolean = true;
  protected match_id: string;
  protected match: Match;
  public viewState: ViewState = ViewState.listReferees;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toast: ToastComponent,
    private userService: UserService,
    private matchService: MatchService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
  }

  ngOnInit() {
    this.initialize();
    this.searchAttribute = 'email|';
    this.getUsers(this.page);
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'schedule':
        result = this.viewState === ViewState.viewSchedule;
        break;
      case 'referees':
        result = this.viewState === ViewState.listReferees;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public getUsers(params: Page) {
    let page: Page = _.cloneDeep(params);
    page.search = 'can_referee|active,' + page.search;
    this.isLoading = true;
    this.matchService
      .getOfficialsByMatch(this.match_id, page)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  protected getData(data: Page): void {
    this.getUsers(data);
  }

  public backToList($event): void {
    this.back.emit(true);
  }

  public officiateMatch(user_id) {
    if (!this.isLoading) {
      this.matchService
        .officiateMatch({
          user_id,
          match_id: this.match_id
        })
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cd.markForCheck();
            this.getUsers(this.page);
          })
        )
        .subscribe(
          res => {
            this.toast.setMessage(
              'Referee Assigned to Match: ' + this.match_id,
              'success'
            );
          },
          (err: HttpErrorResponse) => this.callFailure(err)
        );
    }
  }

  public removeOofficial(user_id) {
    if (!this.isLoading) {
      this.matchService
        .removeOfficial(user_id, this.match_id)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cd.markForCheck();
            this.getUsers(this.page);
          })
        )
        .subscribe(
          res => {
            this.toast.setMessage(
              'Referee was Unassigned from Match: ' + this.match_id,
              'success'
            );
          },
          (err: HttpErrorResponse) => this.callFailure(err)
        );
    }
  }

  private findUser(user: User[], id): User {
    return <User>_.find(this.users, user => {
      return user.id === id;
    });
  }

  private getOfficiatingFromMatch(id): any {
    const user = this.findUser(this.users, id);
    return _.get(user, 'matches[0].officiating', null);
  }

  public canAssign(id): boolean {
    const officiating = this.getOfficiatingFromMatch(id);
    return !officiating || (officiating && officiating.status === 'declined');
  }

  public canUnassign(id): boolean {
    const officiating = this.getOfficiatingFromMatch(id);
    const status = officiating ? officiating.status : undefined;
    return status && (status === 'accepted' || status === 'pending');
  }

  public viewSchedule(user_id) {
    const user = this.findUser(this.users, user_id);

    if (user) {
      this.currentUser = _.cloneDeep(user);
    }
    this.viewState = ViewState.viewSchedule;
    this.cd.markForCheck();
  }

  public viewReferees($event): void {
    this.viewState = ViewState.listReferees;
    this.getData(this.page);
  }

  protected processPagedData(data: PagedData): void {
    this.users = this.extractDataAndPagedData(data);
  }

  protected callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('users data retrieved', 'success');
  }

  protected callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

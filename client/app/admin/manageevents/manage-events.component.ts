import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  AuthService,
  CanComponentDeactivate,
  EventsService
} from './../../services/index';
import * as _ from 'lodash';
import {
  Address,
  BaseModel,
  Game,
  Phone,
  Option,
  Organization,
  State,
  Sport,
  User
} from '../../shared/models/index';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rar-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected titles: string[] = [
    'Event Name',
    'Event Date',
    'Venue',
    'Status',
    '',
    ''
  ];
  protected sports: Option[];
  protected games: Game[] = [];
  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.getEvents();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getEvents() {
    this.eventsService
      .getAllGames()
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  updateEvents() {}

  deleteEvent(user) {}

  callSuccess(res) {
    this.toast.setMessage(res.message, 'success');
    this.games = _.isArray(res) ? _.cloneDeep(res) : [];
    this.isLoading = false;
    console.log('callSuccess:', this.games);
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

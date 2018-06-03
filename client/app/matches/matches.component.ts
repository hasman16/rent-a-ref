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

@Component({
  selector: 'rar-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public createNewMatch(): void {}
}

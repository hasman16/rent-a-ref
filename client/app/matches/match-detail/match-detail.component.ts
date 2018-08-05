import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { ProfileService, UserService } from '../../services/index';

import { ToastComponent } from '../../shared/toast/toast.component';
//Models
import {
  Address,
  Person,
  Phone,
  Profile,
  User
} from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import * as moment from 'moment';

// End
@Component({
  selector: 'rar-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchDetailComponent implements OnInit {
  @Input('match')
  set setCurrentMatch(match) {}
  private currentMatch: any;
  private subscriptions: Subscription[] = [];
  public isLoading: boolean = true;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  getProfile() {}
}

import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { ProfileService, UserService } from '../../services/index';

import { ToastComponent } from '../../shared/toast/toast.component';
//Models
import {
  Address,
  Match,
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
  set setCurrentMatch(match: Match) {
    if (match) {
      this.currentMatch = _.cloneDeep(match);
    }
    this.cd.markForCheck();
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentMatch: Match;
  private subscriptions: Subscription[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  getProfile() {}

  public backToSchedule(event): void {
    this.back.emit(true);
  }
}

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

import { PagingService, MatchService, UserService } from '../../services/index';

import { ToastComponent } from '../../shared/toast/toast.component';
//Models
import {
  Address,
  Match,
  Page,
  PagedData,
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
      this.getData(this.currentMatch.id);
    }
    this.cd.markForCheck();
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentMatch: Match;
  private subscriptions: Subscription[] = [];
  public referees: Array<any> = [];
  public defaultImage: string = 'assets/images/avatar2.png';
  public showDirections: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private matchService: MatchService,
    private pagingService: PagingService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public getImageAddress(referee): string {
    const url = _.get(referee, 'images[0].location', '');
    return url;
  }

  private getData(id: string) {
    const page: Page = this.pagingService.getDefaultPager();
    this.matchService.getMatchOfficials(id, page).subscribe(data => {
      console.log('data was:', data);
      this.referees = data.rows;
    });
  }

  public backToSchedule(event): void {
    this.back.emit(true);
  }
}

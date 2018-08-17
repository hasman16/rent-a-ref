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
import { Location } from '../../googlemap/google-map.component';
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
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentMatch: Match;
  private subscriptions: Subscription[] = [];
  public referees: Array<any> = [];
  public defaultImage: string = 'assets/images/avatar2.png';
  public origin: Location;
  public destination: Location;
  private matchAddress: Address;

  constructor(
    private cd: ChangeDetectorRef,
    private matchService: MatchService,
    private pagingService: PagingService
  ) {}

  ngOnInit() {
    if (this.currentMatch) {
      this.getData(this.currentMatch.id);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public getImageAddress(referee): string {
    const url = _.get(referee, 'images[0].location', this.defaultImage);
    return url;
  }

  private getData(id: string) {
    const page: Page = this.pagingService.getDefaultPager();
    Observable.combineLatest(
      this.matchService.getMatchOfficials(id, page),
      this.matchService.getMatch(id)
    )
      .finally(() => this.cd.markForCheck())
      .subscribe(([referees, match]: [any, any]) => {
        this.referees = referees.rows;
        this.matchAddress = _.cloneDeep(match.address);
        this.origin = null;
        this.destination = {
          address_level_1: this.matchAddress.line1,
          address_level_2: this.matchAddress.city,
          address_state: this.matchAddress.state,
          address_zip: this.matchAddress.zip,
          lng: Number(this.matchAddress.lng),
          lat: Number(this.matchAddress.lat)
        };
        this.destination.marker = {
          lat: this.destination.lat,
          lng: this.destination.lng,
          draggable: false
        };
      });
  }

  public findRoute(event): void {
    this.origin = {
      address_level_1: event.line1,
      address_level_2: event.city,
      address_state: event.state,
      address_zip: event.zip
    };

    this.cd.markForCheck();
  }

  public backToSchedule(event): void {
    this.back.emit(true);
  }
}

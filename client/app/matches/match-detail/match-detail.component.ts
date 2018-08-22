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
  @Input('user')
  set setUser(user: User) {
    if (user) {
      this.user = _.cloneDeep(user);
    }
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentMatch: Match;
  private subscriptions: Subscription[] = [];
  public addresses: Address[];
  public referees: Array<any> = [];
  public defaultImage: string = 'assets/images/avatar2.png';
  public origin: Location;
  public destination: Location;
  public user: User;
  public model: any = {};
  public showDirections: boolean = false;
  public showModal: boolean = false;
  public whichPanel: number = 1;
  public currentReferee: any;

  constructor(
    private cd: ChangeDetectorRef,
    private matchService: MatchService,
    private pagingService: PagingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.showDirections = false;
    if (this.currentMatch) {
      this.getData(this.currentMatch.id);
    }
    if (this.user) {
      this.getAddresses(this.user);
    }
  }

  ngOnDestroy() {
    this.showDirections = false;
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public showRefereeDetails(referee): void {
    let currentReferee = _.cloneDeep(referee);
    currentReferee.url = this.getImageAddress(referee);
    currentReferee.orderedPhones = this.orderPhones(referee);
    currentReferee.addresses = referee.addresses;
    this.currentReferee = _.cloneDeep(currentReferee);
    console.log('showRefereeDetails:', this.currentReferee);

    this.showModal = true;
  }

  public hideRefereeDetails($event): void {
    this.showModal = false;
  }

  public getImageAddress(referee): string {
    const url = _.get(referee, 'images[0].location', this.defaultImage);
    return url;
  }

  private orderPhones(referee): Phone[] {
    const refereePhones = referee.phones;
    const types: string[] = ['mobile', 'home', 'work', 'other'];
    return <Phone[]>types.reduce((phones: Phone[], type: string): Phone[] => {
      let phone: Phone = refereePhones.find(
        (aPhone: Phone): Phone => (aPhone.description === type ? aPhone : null)
      );
      if (phone) {
        phones.push(phone);
      }
      return phones;
    }, []);
  }

  public mainPhone(referee): string {
    const phone: Phone = _.head(this.orderPhones(referee));
    return phone ? phone.description + '<br />' + phone.number : '';
  }

  private getAddresses(user: User): void {
    this.userService
      .getUserAddresses(this.user.id)
      .finally(() => this.cd.markForCheck())
      .subscribe(addresses => {
        this.addresses = _.cloneDeep(addresses.addresses);
      });
  }

  private getData(id: string) {
    const page: Page = this.pagingService.getDefaultPager();
    Observable.combineLatest(
      this.matchService.getMatchOfficials(id, page),
      this.matchService.getMatch(id)
    )
      .finally(() => this.cd.markForCheck())
      .subscribe(([referees, match]: [any, any]) => {
        const matchAddress: Address = _.cloneDeep(match.address);

        this.referees = referees.rows;
        this.origin = null;
        this.destination = {
          address_level_1:
            _.defaultTo(matchAddress.line1, '') +
            ' ' +
            _.defaultTo(matchAddress.line2, ''),
          address_level_2: _.defaultTo(matchAddress.city, ''),
          address_state: _.defaultTo(matchAddress.state, ''),
          address_zip: _.defaultTo(matchAddress.zip, ''),
          lng: Number(matchAddress.lng),
          lat: Number(matchAddress.lat)
        };
        this.destination.marker = {
          lat: this.destination.lat,
          lng: this.destination.lng,
          draggable: false
        };
      });
  }

  public findRoute(event): void {
    this.showDirections = true;
    this.origin = {
      address_level_1:
        _.defaultTo(event.line1, '') + ' ' + _.defaultTo(event.line2, ''),
      address_level_2: _.defaultTo(event.city, ''),
      address_state: _.defaultTo(event.state, ''),
      address_zip: _.defaultTo(event.zip, '')
    };

    this.cd.markForCheck();
  }

  public setAddress(address): void {
    this.model = address;
    this.findRoute(address);
  }

  public backToSchedule(event): void {
    this.back.emit(true);
  }
}

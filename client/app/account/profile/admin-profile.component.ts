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
  selector: 'rar-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProfileComponent implements OnInit {
  @Input('user')
  set setCurrentUser(user) {
    if (user) {
      this.currentUser = user;
      console.log('currentUser:', this.currentUser);
      this.getProfile();
    }
  }
  private currentUser: any;
  private subscriptions: Subscription[] = [];
  protected data: Profile = <Profile>{};
  public user: User = <User>{};
  public person: Person = <Person>{};

  public addresses: Address[];
  public phones: Phone[];
  public middlenameFlag: boolean = false;

  public birthday: string = '';
  public defaultImage: string = 'assets/images/avatar2.png';

  public isLoading: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    this.addresses = [];
    this.phones = [];
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  getImageAddress(): string {
    let url = _.get(this.data, 'images[0].location', '');
    return url;
  }

  getProfile() {
    const currentUser: User = this.currentUser;

    this.profileService
      .getProfile(currentUser.id)
      .finally(() => {
        this.cd.markForCheck();
      })
      .subscribe(
        (profile: Profile) => {
          this.data = profile;
          this.user = <User>{
            id: String(profile.id),
            email: profile.email,
            authorization: String(profile.authorization),
            firstname: profile.person.firstname,
            lastname: profile.person.lastname,
            role: '',
            person_id: String(profile.person.id),
            can_referee: profile.can_referee,
            can_organize: profile.can_organize,
            status: profile.status
          };
          this.person = profile.person;
          this.addresses = _.sortBy(profile.addresses, 'id');
          this.phones = _.sortBy(profile.phones, 'id');
          this.birthday = moment(profile.person.dob).format('LL');
          if (JSON.stringify(profile.person.middlenames) !== 'null') {
            this.middlenameFlag = true;
          }
        },
        (err: HttpErrorResponse) => {}
      );
  }
}

import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  VERSION
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractComponent } from '../../abstract/abstract.component';
import { MeetingsComponentService } from './meetings-component.service';
import { ToastComponent } from './../../shared/toast/toast.component';
import {
  AuthService,
  PagingService,
  UserService
} from './../../services/index';
import {
  Address,
  BaseModel,
  Meeting,
  Phone,
  Option,
  Page,
  PagedData,
  Organization,
  State,
  Sport
} from './../../shared/models/index';
import { PaymentState, Payment } from './../../shared/stripe/stripe-state';
import { Observable } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

enum ViewState {
  noEvents,
  listEvents,
  editEvent,
  payForEvent,
  addMatches
}

@Component({
  selector: 'rar-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingsComponent extends AbstractComponent
  implements OnInit, OnDestroy {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: Option[];

  protected model: any = {};
  protected prices: any[] = [];

  protected sports: Option[];
  public meetings: Meeting[] = [];
  public currentMeeting: Meeting;

  public organization_id: string = '';
  public meeting_id: string = '';
  public buttonText: string = 'Create';
  public viewState: ViewState = ViewState.noEvents;
  public products: any[] = [];
  public plans: any[] = [];
  public placeholder: string = 'filter by "Event Name" ...';

  constructor(
    private cd: ChangeDetectorRef,
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected meetingsComponentService: MeetingsComponentService,
    protected pagingService: PagingService
  ) {
    super(pagingService);
    this.route.params.subscribe(params => {
      this.organization_id = params['organization_id'];
    });
    console.log('VERSION:::::::::::::::', VERSION.full);
  }

  public ngOnInit() {
    this.initialize();
    this.searchAttribute = 'event_name|';
    const meetingData: PagedData = _.cloneDeep(
      this.route.snapshot.data.meetings
    );
    this.processPagedData(meetingData);

    this.sports = this.meetingsComponentService.mapSportsAsOptions(
      this.route.snapshot.data.sportsData.rows
    );

    this.states = this.meetingsComponentService.getStatesProvinces();

    this.setMeetingMode();
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  protected processPagedData(data: PagedData): void {
    this.meetings = this.extractDataAndPagedData(data);
  }

  protected getData(page: Page): void {
    this.getMeeting(page);
  }

  protected formatDate(date: string, timezone_id: string): string {
    return moment.tz(date, timezone_id).format('MMMM DD YYYY');
  }

  public formatStartDate(id): string {
    let item: Meeting = this.findMeetingById(id);
    return this.formatDate(item.start_date, item.timezone_id);
  }

  public setMeetingMode(): void {
    this.isLoading = false;
    if (_.isArray(this.meetings) && this.meetings.length > 0) {
      this.viewState = ViewState.listEvents;
    } else {
      this.viewState = ViewState.noEvents;
    }
    this.cd.markForCheck();
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noEvents':
        result = this.viewState === ViewState.noEvents;
        break;
      case 'listEvents':
        result = this.viewState === ViewState.listEvents;
        break;
      case 'editEvent':
        result = this.viewState === ViewState.editEvent;
        break;
      case 'payingForEvent':
        result = this.viewState === ViewState.payForEvent;
        break;
      case 'addMatches':
        result = this.viewState === ViewState.addMatches;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public prepareModel(model: any): any {
    return Object.assign(
      {
        adults: false,
        teens: false,
        kids: false
      },
      model
    );
  }

  public createNewMeeting(): void {
    this.model = this.prepareModel({});
    this.buttonText = 'Create';
    this.viewState = ViewState.editEvent;
  }

  private findMeetingById(id): Meeting {
    return <Meeting>_.find(this.meetings, meeting => {
      return meeting.id === id;
    });
  }

  public goAddMatches(id: string): void {
    this.currentMeeting = this.findMeetingById(id);
    this.viewState = ViewState.addMatches;
    this.cd.markForCheck();
  }

  public setSelectedTab($event: Event, tab: ViewState): void {
    $event.preventDefault();
    this.viewState = tab;
    this.cd.markForCheck();
  }

  public switchToAddMatch($event): void {
    this.setSelectedTab($event, ViewState.addMatches);
  }

  public switchToEditMeeting($event) {
    this.setSelectedTab($event, ViewState.listEvents);
  }

  public hasPaid(id: string): boolean {
    let meeting: Meeting = this.findMeetingById(id);
    return meeting && meeting.status === 'pending' ? false : true;
  }

  public paymentState(payment: Payment): void {
    if (payment.paymentState === PaymentState.PaymentSuccess) {
      this.getMeeting(this.page);
    }
  }

  public goPayForMeeting(meeting_id: string): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.meetingsComponentService
        .getPreparedMeetingForPayment(meeting_id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.meeting_id = meeting_id;
            this.viewState = ViewState.payForEvent;
            this.cd.markForCheck();
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setMeetingMode();
          }
        );
    }
  }

  public editMeeting(meeting_id: string): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.meetingsComponentService
        .getMeeting(meeting_id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
            this.cd.markForCheck();
          })
        )
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.buttonText = 'Update';
            this.viewState = ViewState.editEvent;
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setMeetingMode();
          }
        );
    }
  }

  public deleteMeeting(meeting_id: string): void {
    console.log('deleteEvent');
    this.meetingsComponentService
      .deleteMeeting(meeting_id)
      .pipe(tap(() => this.getMeeting()))
      .subscribe();
  }

  public getMeeting(page: Page = null): void {
    this.isLoading = true;

    this.meetingsComponentService
      .getOrganizationMeetings(this.organization_id, page)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.setMeetingMode();
        })
      )
      .subscribe(
        (data: PagedData) => {
          this.processPagedData(data);
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to retrieve Events.')
      );
  }

  public submitMeeting(model: Meeting): void {
    const meeting: Meeting = this.meetingsComponentService.convertModelToMeeting(
      model
    );

    if (_.isNil(model.id) || !model.id) {
      this.submitNewMeeting(meeting);
    } else {
      this.submitUpdateMeeting(meeting);
    }
  }

  public submitNewMeeting(model: Meeting): void {
    this.isLoading = true;
    this.meetingsComponentService
      .createMeeting(this.organization_id, model)
      .pipe(
        finalize(() => {
          this.getMeeting();
        })
      )
      .subscribe(
        (meeting: Meeting) => {
          this.toast.setMessage('Event created.', 'info');
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to create new event.')
      );
  }

  public submitUpdateMeeting(model: any): void {
    this.meetingsComponentService
      .updateMeetingAddress(model)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.getMeeting();
          this.cd.markForCheck();
        })
      )
      .subscribe(
        (meeting: Meeting) => {
          this.toast.setMessage('Event updated.', 'info');
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to update new event.')
      );
  }

  public callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }

  public onCancel(): void {
    this.setMeetingMode();
  }
}

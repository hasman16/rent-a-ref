import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import {
  CanComponentDeactivate,
  MeetingService,
  PagingService,
  StatesService
} from './../../services/index';
import { MeetingsComponentService } from './../../organize/meetings/meetings-component.service';
import {
  Address,
  BaseModel,
  Meeting,
  Page,
  PagedData,
  Phone,
  Option,
  Organization,
  State,
  Sorts,
  Sport,
  User
} from '../../shared/models/index';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import * as _ from 'lodash';

enum TabState {
  editEvent,
  addMatch
}

@Component({
  selector: 'rar-manage-meetings',
  templateUrl: './manage-meetings.component.html',
  styleUrls: ['./manage-meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageMeetingsComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  public sports: Option[];
  public states: Option[];
  public meetings: Meeting[] = [];
  protected page: Page;
  public isEditing: boolean = false;
  public model: any = {};
  protected selected: any[] = [];
  protected selectedTab: TabState = TabState.editEvent;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    public toast: ToastComponent,
    private meetingService: MeetingService,
    private pagingService: PagingService,
    protected meetingsComponentService: MeetingsComponentService
  ) {
    this.page = _.cloneDeep(this.pagingService.getDefaultPager());
  }

  ngOnInit() {
    const [meetingData, sportsData]: [
      PagedData,
      PagedData
    ] = this.route.snapshot.data.meetingData;
    this.sports = this.meetingsComponentService.mapSportsAsOptions(
      sportsData.rows
    );
    this.states = this.meetingsComponentService.getStatesProvinces();
    this.setSelectedTab(TabState.editEvent);
    this.processPagedData(meetingData);
    this.isLoading = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  public switchToEditMeeting($event): void {
    $event.preventDefault();
    this.setSelectedTab(TabState.editEvent);
  }

  public isTabEditMeeting(): boolean {
    return this.selectedTab === TabState.editEvent;
  }

  public switchToAddMatch($event): void {
    $event.preventDefault();
    this.setSelectedTab(TabState.addMatch);
  }

  public isTabAddMatch(): boolean {
    return this.selectedTab === TabState.addMatch;
  }

  public setSelectedTab(tab: TabState): void {
    this.selectedTab = tab;
  }

  public onSelectTableRow({ selected }): void {
    const event = _.cloneDeep(_.head(selected));
    this.isEditing = true;
    this.editMeeting(event);
  }

  public editMeeting(meeting: Meeting): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.meetingsComponentService
        .getMeeting(meeting.id)
        .pipe(
          take(1),
          finalize(() => {
            this.cd.markForCheck();
          })
        )
        .subscribe(
          (model: any) => {
            this.model = _.cloneDeep(model);
            this.setSelectedTab(TabState.editEvent);
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.isEditing = false;
          }
        );
    }
  }

  public formatDate(id): string {
    return this.pagingService.formatDate(id, this.meetings);
  }

  public onActivate(event): void {
    console.log('Activate Event', event);
  }

  public onSortTableColumn(sorting): void {
    const page: Page = this.pagingService.sortColumn(this.page, sorting);
    this.page = _.cloneDeep(page);
    this.getMeeting(this.page);
  }

  public setPage(paging): void {
    this.page.offset = paging.offset;
    this.getMeeting(this.page);
  }

  public getMeeting(params: any) {
    this.isLoading = true;
    this.meetingService
      .getAllMeetings(params)
      .pipe(
        finalize(() => {
          this.cd.markForCheck();
        })
      )
      .subscribe(
        res => this.callSuccess(res),
        (err: HttpErrorResponse) => this.callFailure(err)
      );
  }

  public submitUpdateMeeting(model: any): void {
    this.meetingsComponentService
      .updateMeetingAddress(model)
      .pipe(
        finalize(() => {
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

  public deleteMeeting(user) {
    console.log('delete:', user);
  }

  public submitMeeting(model: Meeting): void {
    const meeting: Meeting = this.meetingsComponentService.convertModelToMeeting(
      model
    );

    if (_.isNil(model.id) || !model.id) {
      //this.submitNewEvent(game);
    } else {
      this.submitUpdateMeeting(event);
      // this.setEventsMode();
    }
  }

  protected processPagedData(data: PagedData): void {
    let [page, newData] = this.pagingService.processPagedData(this.page, data);
    this.page = page;
    this.meetings = newData;
  }

  protected callSuccess(data: PagedData) {
    this.processPagedData(data);
    this.toast.setMessage('Events data retrieved', 'success');
    this.isLoading = false;
  }

  protected callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }
}

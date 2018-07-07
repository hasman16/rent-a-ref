import { Router, ActivatedRoute } from '@angular/router';

import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../../abstract/abstract.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Page, PagedData, Sorts, User } from '../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

import {
	AuthService,
	CanComponentDeactivate,
	MatchService,
	PagingService,
	UserService
} from '../../services/index';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent extends AbstractComponent implements OnInit {
	public schedule: any[];
	public isLoading: boolean = false;
	public placeholder: string = 'search venue name';
	constructor(
		private cd: ChangeDetectorRef,
		private auth: AuthService,
		private route: ActivatedRoute,
		private toast: ToastComponent,
		private userService: UserService,
		private matchService: MatchService,
		protected pagingService: PagingService
	) {
		super(pagingService);
	}

	ngOnInit() {
		this.initialize();
		this.searchAttribute = 'match_name|';
		const pagedData: PagedData = this.route.snapshot.data.scheduleData;
		this.processPagedData(pagedData);
	}

	public onSelect({ selected }): void {
		console.log('Select Event', selected, this.selected);
		const match = _.cloneDeep(_.head(selected));
		//this.isEditing = true;
		//this.editEvent(game);
	}

	public setPage(paging): void {
		this.page.offset = paging.offset;
		this.getSchedule(this.page);
	}

	public getSchedule(params: Page) {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		let page: Page = _.cloneDeep(params);
		this.isLoading = true;
		this.matchService
			.scheduleByReferee(user_id, page)
			.subscribe(
				res => this.callSuccess(res),
				(err: HttpErrorResponse) => this.callFailure(err)
			);
	}

	protected callSuccess(data: PagedData) {
		this.processPagedData(data);
		this.toast.setMessage('schedule data retrieved', 'success');
		this.isLoading = false;
		this.cd.markForCheck();
	}

	protected callFailure(
		err: HttpErrorResponse,
		message = 'An error occurred'
	) {
		if (err.error instanceof Error) {
			this.toast.setMessage(message, 'danger');
		} else {
			this.toast.setMessage(
				'An error occurred:' + err.statusText,
				'danger'
			);
		}
		this.isLoading = false;
		this.cd.markForCheck();
	}

	protected processPagedData(data: PagedData): void {
		this.schedule = this.extraPagedData(data);
	}

	protected getData(data: Page): void {
		this.getSchedule(data);
	}
}

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
import { Match, Page, PagedData, Sorts, User } from '../../shared/models/index';
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
	private user: User;

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
		this.user = this.auth.getCurrentUser();
		this.searchAttribute = 'match_name|';
		const pagedData: PagedData = this.route.snapshot.data.scheduleData;
		this.processPagedData(pagedData);
	}

	public onSelect({ selected }): void {
		const match = _.cloneDeep(_.head(selected));
	}

	public setPage(paging): void {
		this.page.offset = paging.offset;
		this.getSchedule(this.page);
	}

	public formatDate(id): string {
		return this.pagingService.formatDate(id, this.schedule);
	}

	private getOfficial(id, officials): any {
		return _.find(officials, item => {
			return id == item.user_id;
		});
	}

	private getItem(id): Match {
		return <Match>_.find(this.schedule, item => {
			return id == item.id;
		});
	}

	private matchIsPending(item: Match): boolean {
		const status: string = item.status || '';
		return status === 'pending' || status === 'active';
	}

	private isNotTimeLocked(item: Match): boolean {
		const timeLock: boolean = this.pagingService.isNotTimeLocked(item);
		return timeLock;
	}

	private isNotCancelled(officials): boolean {
		return _.every(officials, official => {
			const status: string = official.status;
			return status != 'cancelled' && status != 'played';
		});
	}

	public officiateState(id, state: string): boolean {
		let result: boolean = false;
		const item: Match = this.getItem(id);
		if (item && this.matchIsPending(item) && this.isNotTimeLocked(item)) {
			const officials: any[] = item['users'];
			if (this.isNotCancelled(officials)) {
				const official = this.getOfficial(this.user.id, officials);
				if (official.status === state) {
					result = true;
				}
			}
		}
		return result;
	}

	public canAccept(id): boolean {
		return this.officiateState(id, 'pending');
	}

	public canDecline(id): boolean {
		return this.officiateState(id, 'pending');
	}

	public canTurnBack(id): boolean {
		return this.officiateState(id, 'accepted');
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

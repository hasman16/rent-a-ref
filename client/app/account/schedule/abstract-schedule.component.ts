import { Router, ActivatedRoute } from '@angular/router';

import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../../abstract/abstract.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Match, Page, PagedData, Sorts, User } from '../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/empty';

import * as _ from 'lodash';

import {
	AuthService,
	CanComponentDeactivate,
	MatchService,
	PagingService,
	UserService
} from '../../services/index';

export abstract class AbstractScheduleComponent extends AbstractComponent {
	public schedule: any[];
	public isLoading: boolean = false;
	public placeholder: string = 'search venue name';
	public user: User;

	constructor(
		protected cd: ChangeDetectorRef,
		protected auth: AuthService,
		protected route: ActivatedRoute,
		protected toast: ToastComponent,
		protected userService: UserService,
		protected matchService: MatchService,
		protected pagingService: PagingService
	) {
		super(pagingService);
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

	protected getOfficial(id, officials): any {
		return _.find(officials, item => {
			return id == item.user_id;
		});
	}

	protected getItem(id): Match {
		return <Match>_.find(this.schedule, item => {
			return id == item.id;
		});
	}

	protected matchIsPending(item: Match): boolean {
		const status: string = item.status || '';
		return status === 'pending' || status === 'active';
	}

	protected abstract isNotTimeLocked(item: Match): boolean;

	public officiateState(id, state: string): boolean {
		let result: boolean = false;
		const item: Match = this.getItem(id);
		if (item && this.matchIsPending(item) && this.isNotTimeLocked(item)) {
			const invitedOfficials: any[] = item['users'];
			const official = this.getOfficial(this.user.id, invitedOfficials);
			if (official.status === state) {
				result = true;
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

	protected generateOfficiateRelation(id, operation, success, error) {
		const item: Match = this.getItem(id);
		const officiate = {
			user_id: this.user.id,
			match_id: item.id
		};
		let observable: Observable<any>;

		this.isLoading = true;
		if (operation === 'accept') {
			observable = this.matchService.acceptMatch(officiate);
		} else if (operation === 'decline') {
			observable = this.matchService.declineMatch(officiate);
		} else {
			observable = Observable.empty();
		}

		observable
			.finally(() => {
				this.isLoading = false;
				this.cd.markForCheck();
				this.getData(this.page);
			})
			.subscribe(
				() => {
					this.toast.setMessage(success, 'success');
				},
				error => {
					this.toast.setMessage(error, 'success');
				}
			);
	}

	public acceptMatch(id): void {
		const error: string = 'Error: Game was NOT accepted.';
		const success: string = 'Game Accepted.';
		this.generateOfficiateRelation(id, 'accept', success, error);
	}

	public declineMatch(id): void {
		const error: string = 'Error: Game was NOT declined.';
		const success: string = 'Game Declined.';
		this.generateOfficiateRelation(id, 'decline', success, error);
	}

	public getSchedule(params: Page) {
		const currentUser: User = this.user;
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

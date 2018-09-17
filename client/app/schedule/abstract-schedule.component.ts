import { Router, ActivatedRoute } from '@angular/router';

import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../abstract/abstract.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { Match, Page, PagedData, Sorts, User } from '../shared/models/index';
import { empty, Observable, Subscription, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

import {
	AuthService,
	CanComponentDeactivate,
	MatchService,
	PagingService,
	UserService
} from '../services/index';
export enum ViewState {
	scheduleView,
	matchView
}

export abstract class AbstractScheduleComponent extends AbstractComponent {
	public schedule: any[];
	public isLoading: boolean = false;
	public placeholder: string = 'search venue name';
	public user: User;
	public selectedMatch: any;
	public viewState: ViewState = ViewState.scheduleView;

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

	public onSelectTableRow({ selected }): void {
		this.selectedMatch = _.cloneDeep(_.head(selected));
		this.viewState = ViewState.matchView;
	}

	public backToSchedule(event): void {
		this.viewState = ViewState.scheduleView;
	}

	public formatDate(id): string {
		return this.pagingService.formatDate(id, this.schedule);
	}

	public formatTime(id): string {
		return this.pagingService.formatTime(id, this.schedule);
	}

	protected getOfficial(id, officials): any {
		return _.find(officials, item => {
			return id === item.user_id;
		});
	}

	protected getItem(id): Match {
		return <Match>_.find(this.schedule, item => {
			return id === item.id;
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
			observable = empty();
		}

		observable
			.pipe(
				finalize(() => {
					this.isLoading = false;
					this.cd.markForCheck();
					this.getData(this.page);
				})
			)
			.subscribe(
				() => {
					this.toast.setMessage(success, 'success');
				},
				error => {
					this.toast.setMessage(error, 'success');
				}
			);
	}

	public acceptMatch(event): void {
		this.processButtonClick(event, 'accept');
	}

	public declineMatch(event): void {
		this.processButtonClick(event, 'decline');
	}

	private processButtonClick(event, action: string): void {
		event.stopImmediatePropagation();
		const actionLabel: string =
			action === 'accept' ? 'accepted' : 'declined';
		const error: string = 'Error: Game was NOT ${actionLabel}.';
		const success: string = 'Game ${actionLabel}.';
		const id: number = parseInt(event.target.nextElementSibling.value);
		this.generateOfficiateRelation(id, action, success, error);
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
		this.schedule = this.extractDataAndPagedData(data);
	}

	protected getData(data: Page): void {
		this.getSchedule(data);
	}

	public switchToSchedule(event): void {
		this.viewState = ViewState.scheduleView;
	}

	public switchToMatch(event): void {
		this.viewState = ViewState.matchView;
	}

	public isScheduleView(): boolean {
		return this.viewState === ViewState.scheduleView;
	}

	public isMatchView(): boolean {
		return this.viewState === ViewState.matchView;
	}
}

import { Router, ActivatedRoute } from '@angular/router';

import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../abstract/abstract.component';
import { ToastComponent } from '../shared/toast/toast.component';
import {
	Match,
	Officiating,
	Page,
	PagedData,
	Sorts,
	User
} from '../shared/models/index';
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

interface MatchOfficiating extends Match {
	users?: Officiating[];
}

export abstract class AbstractScheduleComponent extends AbstractComponent {
	public schedule: MatchOfficiating[];
	public isLoading: boolean = false;
	public placeholder: string = 'search venue name';
	public user: User;
	public selectedMatch: MatchOfficiating;
	public viewState: ViewState = ViewState.scheduleView;
	private positions: any = {
		0: 'Center',
		1: 'AssistentRef1',
		2: 'AssistentRef2',
		3: 'FourthOfficial'
	};
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

	public rowSelected(game): void {
		this.selectedMatch = _.cloneDeep(game);
		this.viewState = ViewState.matchView;
	}

	public getPosition(match: MatchOfficiating): string {
		const officiating: Officiating = _.head(match.users);
		const positionId = officiating.position || 0;
		return this.positions[positionId];
	}

	public backToSchedule(event): void {
		this.viewState = ViewState.scheduleView;
	}

	public formatDate(match: MatchOfficiating): string {
		return this.pagingService.formatDate(match.id, this.schedule);
	}

	public formatTime(match: MatchOfficiating): string {
		return this.pagingService.formatTime(match.id, this.schedule);
	}

	protected matchIsPending(item: Match): boolean {
		const status: string = item.status || '';
		return status === 'pending' || status === 'active';
	}

	protected abstract isNotTimeLocked(item: Match): boolean;

	protected getOfficial(id, officials): any {
		return;
	}

	public officiateState(
		matchOfficiating: MatchOfficiating,
		state: string
	): boolean {
		let result: boolean = false;
		if (
			matchOfficiating &&
			this.matchIsPending(matchOfficiating) &&
			this.isNotTimeLocked(matchOfficiating)
		) {
			const userId = this.user.id;
			const official = _.find(matchOfficiating.users, item => {
				return userId === item.user_id;
			});
			if (official.status === state) {
				result = true;
			}
		}
		return result;
	}

	public canAccept(matchOfficiating: MatchOfficiating): boolean {
		return this.officiateState(matchOfficiating, 'pending');
	}

	public canDecline(matchOfficiating: MatchOfficiating): boolean {
		return this.officiateState(matchOfficiating, 'pending');
	}

	public canTurnBack(matchOfficiating: MatchOfficiating): boolean {
		return this.officiateState(matchOfficiating, 'accepted');
	}

	protected getMatchFromSchedule(id): MatchOfficiating {
		return <MatchOfficiating>_.find(this.schedule, item => {
			return id === item.id;
		});
	}

	protected generateOfficiateRelation(id, operation, success, error) {
		const item: Match = this.getMatchFromSchedule(id);
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
		const id: number = parseInt(
			String(event.target.id).replace(/[a-z]/gi, '')
		);
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

	public pageChanged(pageNumber: number): void {
		this.setPage(<Page>{ offset: pageNumber - 1 });
	}
}

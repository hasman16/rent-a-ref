import { Router, ActivatedRoute } from '@angular/router';

import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractScheduleComponent } from './abstract-schedule.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { Match, Page, PagedData, Sorts, User } from '../shared/models/index';
import { Observable, Subscription, Subject } from 'rxjs';

import * as _ from 'lodash';

import {
	AuthService,
	CanComponentDeactivate,
	MatchService,
	PagingService,
	UserService
} from '../services/index';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent extends AbstractScheduleComponent
	implements OnInit {
	constructor(
		protected cd: ChangeDetectorRef,
		protected auth: AuthService,
		protected route: ActivatedRoute,
		protected toast: ToastComponent,
		protected userService: UserService,
		protected matchService: MatchService,
		protected pagingService: PagingService
	) {
		super(cd, auth, route, toast, userService, matchService, pagingService);
	}

	ngOnInit() {
		this.initialize();
		this.user = this.auth.getCurrentUser();
		this.searchAttribute = 'match_name|';
		const pagedData: PagedData = this.route.snapshot.data.scheduleData;
		this.processPagedData(pagedData);
	}

	protected isNotTimeLocked(item: Match): boolean {
		const timeLock: boolean = this.pagingService.isNotTimeLocked(item);
		return timeLock;
	}
}

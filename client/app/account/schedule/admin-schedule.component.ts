import { Router, ActivatedRoute } from '@angular/router';

import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractScheduleComponent } from './abstract-schedule.component';
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

@Component({
	selector: 'rar-admin-schedule',
	templateUrl: './admin-schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminScheduleComponent extends AbstractScheduleComponent
	implements OnInit {
	@Input('user')
	set setUser(user: User) {
		if (user) {
			this.user = user;
			const page: Page = this.pagingService.getDefaultPager();
			this.getData(page);
		}
	}
	@Output('back')
	submitter: EventEmitter<boolean> = new EventEmitter<boolean>();
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
		this.searchAttribute = 'match_name|';
	}

	//Admin cannot be time locked.
	protected isNotTimeLocked(item: Match): boolean {
		return true;
	}

	public backToList($event): void {
		this.submitter.emit(true);
	}
}

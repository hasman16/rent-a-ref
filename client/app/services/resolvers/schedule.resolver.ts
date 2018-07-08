import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
	AuthService,
	OrganizeService,
	MatchService,
	PagingService
} from './../http/index';
import {
	Organization,
	Page,
	PagedData,
	Profile,
	User
} from './../../shared/models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class ScheduleResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected auth: AuthService,
		protected matchService: MatchService,
		protected pagingService: PagingService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<PagedData> {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		const pagingInfo: Page = this.pagingService.getDefaultPager();

		return this.matchService
			.scheduleByReferee(user_id, pagingInfo)
			.catch(() => {
				return Observable.empty();
			})
			.map((data: PagedData) => {
				return data;
			});
	}
}

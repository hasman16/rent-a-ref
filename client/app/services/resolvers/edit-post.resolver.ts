import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
	AuthService,
	OrganizeService,
	BlogService,
	PagingService
} from './../http/index';
import {
	Organization,
	Page,
	PagedData,
	Profile,
	User
} from './../../shared/models/index';

import { Observable, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BlogResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected auth: AuthService,
		protected blogService: BlogService,
		protected pagingService: PagingService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<PagedData> {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		const pagingInfo: Page = this.pagingService.getDefaultPager();

		return this.blogService.getUserPost(user_id, pagingInfo).pipe(
			catchError(() => {
				return empty();
			}),
			map((data: PagedData) => {
				return data;
			})
		);
	}
}

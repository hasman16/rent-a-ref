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
	Post,
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
export class CreateBlogResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected post: Post,
		protected auth: AuthService,
		protected blogService: BlogService,
		protected pagingService: PagingService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<PagedData> {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		const pagingInfo: Page = this.pagingService.getDefaultPager();

		return this.blogService
			.createPost(this.post)
			.catch(() => {
				return Observable.empty();
			})
			.map((data: PagedData) => {
				return data;
			});
	}
}

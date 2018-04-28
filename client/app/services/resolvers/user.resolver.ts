import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PagingService, UserService } from './../http/index';
import { Page, PagedData } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected pagingService: PagingService,
		protected userService: UserService
	) {}

	resolve(): Observable<PagedData> {
		const pagingInfo: Page = this.pagingService.getDefaultPager();
		return this.userService.getUsers(pagingInfo);
	}
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, OrganizeService, PagingService } from './../http/index';
import {
	Organization,
	Page,
	PagedData,
	User
} from './../../shared/models/index';

import { Observable, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OrganizationsResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected auth: AuthService,
		protected pagingService: PagingService,
		protected organizeService: OrganizeService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<PagedData> {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;

		const pagingInfo: Page = this.pagingService.getDefaultPager();

		return this.organizeService
			.getUserOrganization(user_id, pagingInfo)
			.pipe(
				catchError(() => {
					return empty();
				})
			);
	}
}

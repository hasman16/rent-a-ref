import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {
	OrganizeService,
	PagingService,
	UserService
} from './../../services/index';
import { Page, PagedData, Sport } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SportsResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected pagingService: PagingService,
		protected organizeService: OrganizeService
	) {}

	resolve(): Observable<PagedData> {
		const pagingInfo: Page = this.pagingService.getDefaultPager();
		return this.organizeService.getSports(pagingInfo);
	}
}

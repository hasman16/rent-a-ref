import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrganizeService, PagingService, EventsService } from './../http/index';
import { Page, PagedData } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class AdminEventsResolver
	implements Resolve<Observable<{} | [PagedData, PagedData]>> {
	constructor(
		protected pagingService: PagingService,
		protected eventsService: EventsService,
		protected organizeService: OrganizeService
	) {}

	resolve(): Observable<{} | [PagedData, PagedData]> {
		const pagingInfo: Page = this.pagingService.getDefaultPager();
		return Observable.combineLatest(
			this.eventsService.getAllGames(pagingInfo),
			this.organizeService.getSports(pagingInfo)
		).catch(() => {
			return Observable.empty();
		});
	}
}

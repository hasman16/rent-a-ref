import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PagingService, EventsService } from './../http/index';
import { Page, PagedData } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminEventsResolver implements Resolve<Observable<PagedData>> {
	constructor(
		protected pagingService: PagingService,
		protected eventsService: EventsService
	) {}

	resolve(): Observable<PagedData> {
		const pagingInfo: Page = this.pagingService.getDefaultPager();
		return this.eventsService.getAllGames(pagingInfo);
	}
}

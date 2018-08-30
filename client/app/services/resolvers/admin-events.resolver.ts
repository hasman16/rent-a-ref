import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrganizeService, PagingService, EventsService } from './../http/index';
import { Page, PagedData } from './../../shared/models/index';
import { Observable, combineLatest, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
		return combineLatest(
			this.eventsService.getAllGames(pagingInfo),
			this.organizeService.getSports(pagingInfo)
		).pipe(
			catchError(() => {
				return empty();
			})
		);
	}
}

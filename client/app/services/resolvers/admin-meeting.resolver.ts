import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {
	OrganizeService,
	PagingService,
	MeetingService
} from './../http/index';
import { Page, PagedData } from './../../shared/models/index';
import { Observable, combineLatest, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AdminMeetingResolver
	implements Resolve<Observable<{} | [PagedData, PagedData]>> {
	constructor(
		protected pagingService: PagingService,
		protected meetingService: MeetingService,
		protected organizeService: OrganizeService
	) {}

	resolve(): Observable<{} | [PagedData, PagedData]> {
		const pagingInfo: Page = this.pagingService.getDefaultPager();
		return combineLatest(
			this.meetingService.getAllMeetings(pagingInfo),
			this.organizeService.getSports(pagingInfo)
		).pipe(
			catchError(() => {
				return empty();
			})
		);
	}
}

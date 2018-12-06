import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MeetingService } from './../http/index';
import { Meeting } from './../../shared/models/index';
import { Observable, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MeetingResolver implements Resolve<Observable<any>> {
	constructor(protected meetingService: MeetingService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		const organization_id = route.paramMap.get('organization_id');

		return this.meetingService.getOrganizationMeetings(organization_id).pipe(
			catchError(() => {
				return empty();
			})
		);
	}
}

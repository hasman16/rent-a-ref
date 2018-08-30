import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EventsService } from './../http/index';
import { Game } from './../../shared/models/index';
import { Observable, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EventsResolver implements Resolve<Observable<any>> {
	constructor(protected eventsService: EventsService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		const organization_id = route.paramMap.get('organization_id');

		return this.eventsService.getOrganizationGames(organization_id).pipe(
			catchError(() => {
				return empty();
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EventsService } from './../../services/index';
import { Game } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class EventsResolver implements Resolve<Observable<any>> {
	constructor(protected eventsService: EventsService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		const organization_id = route.paramMap.get('organization_id');

		return this.eventsService
			.getOrganizationGames(organization_id)
			.catch(() => {
				return Observable.empty();
			});
	}
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrganizeService } from './../services/index';
import { Sport } from './../shared/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SportsResolver implements Resolve<Observable<Sport[]>> {
	constructor(protected organizeService: OrganizeService) {}

	resolve(): Observable<Sport[]> {
		return this.organizeService.getSports();
	}
}

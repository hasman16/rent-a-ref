import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, OrganizeService } from './../../services/index';
import { Organization, Profile } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class OrganizationsResolver
	implements Resolve<Observable<Organization[]>> {
	constructor(
		protected auth: AuthService,
		protected organizeService: OrganizeService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Organization[]> {
		const user_id = this.auth.currentUser.id;

		return this.organizeService
			.getUserOrganization(user_id)
			.catch(() => {
				return Observable.empty();
			})
			.map((profile: Profile) => {
				return profile.organizations;
			});
	}
}

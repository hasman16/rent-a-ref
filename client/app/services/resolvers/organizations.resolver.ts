import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, OrganizeService } from './../http/index';
import { Organization, Profile, User } from './../../shared/models/index';
import { Observable, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OrganizationsResolver
	implements Resolve<Observable<Organization[]>> {
	constructor(
		protected auth: AuthService,
		protected organizeService: OrganizeService
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Organization[]> {
		const currentUser: User = this.auth.getCurrentUser();

		const user_id = currentUser.id;

		return this.organizeService.getUserOrganization(user_id).pipe(
			catchError(() => {
				return empty();
			}),
			map((profile: Profile) => {
				return profile.organizations;
			})
		);
	}
}

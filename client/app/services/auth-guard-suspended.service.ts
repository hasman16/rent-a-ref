import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../shared/models/index';

@Injectable()
export class AuthGuardSuspended implements CanActivate {
	constructor(public auth: AuthService, private router: Router) {}

	canActivate() {
		const currentUser: User = this.auth.getCurrentUser();

		return this.auth.loggedIn && currentUser.status == 'suspended';
	}
}

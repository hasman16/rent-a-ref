import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardLocked implements CanActivate {
	constructor(public auth: AuthService, private router: Router) {}

	canActivate() {
		return this.auth.loggedIn && this.auth.currentUser.status == 'locked';
	}
}

import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { Login, User } from './../shared/models/index';

@Injectable()
export class AuthGuardLogin implements CanActivate {
	constructor(public auth: AuthService, private router: Router) {}

	canActivate() {
		const currentUser: User = this.auth.getCurrentUser();
		let result: boolean = false;

		if (this.auth.loggedIn) {
			const status: string = currentUser.status;

			if (this.auth.isActive) {
				result = true;
			} else if (status == 'suspended') {
				this.router.navigate(['/suspended']);
			} else if (status == 'pending') {
				this.router.navigate(['/pending']);
			}
		} else {
			this.router.navigate(['/login']);
		}
		return result;
	}
}

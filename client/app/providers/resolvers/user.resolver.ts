import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from './../../services/index';
import { User } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserResolver implements Resolve<Observable<User[]>> {
	constructor(protected userService: UserService) {}

	resolve(): Observable<User[]> {
		return this.userService.getUsers();
	}
}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService, UserService } from '../../../services/index';
//Models
import {
	Address,
	Person,
	Phone,
	Profile,
	User
} from './../../../shared/models/index';

@Component({
	selector: 'app-standby',
	templateUrl: './standby.component.html',
	styleUrls: ['./standby.component.scss']
})
export class StandbyComponent implements OnInit {
	public user: User = <User>{};
	public person: Person = <Person>{};

	constructor(private auth: AuthService, private userService: UserService) {}

	ngOnInit() {
		this.getProfile();
	}

	getProfile() {
		const currentUser: User = this.auth.getCurrentUser();

		this.userService.getProfile(currentUser.id).subscribe(
			(res: Profile) => {
				this.user = {
					id: String(res.id),
					email: res.email,
					authorization: String(res.authorization),
					firstname: res.person.firstname,
					lastname: res.person.lastname,
					role: '',
					person_id: String(res.person.id),
					can_referee: res.can_referee,
					can_organize: res.can_organize,
					status: res.status
				} as User;
				this.person = res.person;
			},

			(err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log(
						'A client-side or network error occurred for the Profile'
					);
				} else {
					console.log(
						'The backend returned an unsuccessful response code for the profile'
					);
				}

				if (!this.auth.loggedIn) {
					this.auth.logout();
				}
			}
		);
	}
}

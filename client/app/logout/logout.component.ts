import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';

@Component({
	standalone: false,
	selector: 'app-logout',
	template: './logout.component.html',
	styles: ['']
})
export class LogoutComponent implements OnInit {
	constructor(private auth: AuthService) {}

	ngOnInit() {
		this.auth.logout();
	}
}

import { environment } from '../environments/environment';
import { Component } from '@angular/core';
import { AuthService, UserService } from './services/index';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private auth: AuthService) {
		this.auth.SITE_KEY = environment.SITE_KEY;
		console.log('environment;', environment);
	}
}

//https://hackedbychinese.github.io/ng2-idle/
//https://github.com/isaacplmann/ngx-tour
//https://medium.com/@jeroenouw/upgrade-to-angular-6-4520e46c682b
import { environment } from './environments/environment';
import { Component } from '@angular/core';
import { AuthService, UserService } from './services/index';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public idleState = 'Not started.';
	public timedOut = false;
	public lastPing?: Date = null;

	constructor(
		private auth: AuthService,
		private idle: Idle,
		private keepalive: Keepalive
	) {
		this.auth.SITE_KEY = environment.SITE_KEY;
	}

	private reset() {
		this.idle.watch();
		this.idleState = 'Started.';
		this.timedOut = false;
	}
}

//https://hackedbychinese.github.io/ng2-idle/
//https://github.com/isaacplmann/ngx-tour
//https://medium.com/@jeroenouw/upgrade-to-angular-6-4520e46c682b
import { environment } from './environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserService } from './services/index';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { PulseComponent } from './pulse/pulse.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Keepalive } from '@ng-idle/keepalive';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	public idleState = 'Not started.';
	public timedOut = false;
	public lastPing: Date = null;
	private pulseDialog;

	constructor(
		private auth: AuthService,
		private idle: Idle,
		private keepalive: Keepalive,
		public dialog: MatDialog
	) {
		this.auth.SITE_KEY = environment.SITE_KEY;
	}

	ngOnInit() {
		this.cleanUp();
		// sets an idle timeout of 5 seconds, for testing purposes.
		this.idle.setIdle(5);

		// sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
		this.idle.setTimeout(5);

		// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		this.subscriptions.push(
			this.auth.loginStatus$.subscribe(state => {
				if (state) {
					this.reset();
				} else {
					this.idle.stop();
				}
				this.closeDialog();
			})
		);

		this.subscriptions.push(
			this.idle.onIdleEnd.subscribe(() => {
				this.idleState = 'No longer idle.';
			})
		);

		this.subscriptions.push(
			this.idle.onTimeout.subscribe(() => {
				this.idleState = 'Timed out!';
				this.timedOut = true;
				let dialog = this.dialog.open(PulseComponent);
				this.closeDialog();
				this.auth.logout();
			})
		);

		this.subscriptions.push(
			this.idle.onIdleStart.subscribe(() => {
				this.idleState = "You've gone idle!";
			})
		);

		this.subscriptions.push(
			this.idle.onTimeoutWarning.subscribe(countdown => {
				this.idleState =
					'You will time out in ' + countdown + ' seconds!';
			})
		);

		// sets the ping interval to 15 seconds
		this.keepalive.interval(15);

		this.subscriptions.push(
			this.keepalive.onPing
				.pipe(tap(() => this.auth.pulse()))
				.subscribe(() => {
					this.lastPing = new Date();
				})
		);
	}

	private openDialog() {
		this.pulseDialog = this.dialog.open(PulseComponent);
	}

	private closeDialog() {
		if (this.pulseDialog) {
			this.pulseDialog.close();
		}
	}

	ngOnDestroy() {
		this.cleanUp();
	}

	private cleanUp() {
		this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
		this.subscriptions = [];
	}

	private reset() {
		this.idle.watch();
		this.idleState = 'Started.';
		this.timedOut = false;
	}
}

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
import { Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';

const THIRTY_SECONDS: number = 30;
const ONE_MINUTE: number = 2 * THIRTY_SECONDS;
const TEN_MINUTES: number = 10 * ONE_MINUTE;
const FIFTEEN_MINUTES: number = 15 * ONE_MINUTE;

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	public timedOut: boolean = false;
	public lastPing: Date = null;
	private pulseDialog: MatDialogRef<PulseComponent>;

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
		// sets an idle timeout of 10 minutes, for testing purposes.
		this.idle.setIdle(TEN_MINUTES);

		// sets a timeout period of 30 seconds. after 10 minutes of inactivity, the user will be considered timed out.
		this.idle.setTimeout(THIRTY_SECONDS);

		// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		this.setIdleText('Not started.');

		this.subscriptions.push(
			this.auth.loginStatus$.subscribe(state => {
				if (state) {
					this.resetIdleAndKeepalive();
				} else {
					this.stopIdleAndKeepalive();
				}
				this.closeDialog();
			})
		);

		this.subscriptions.push(
			this.idle.onIdleEnd.subscribe(() => {
				this.auth.setIdleText('No longer idle.');
				this.closeDialog();
			})
		);

		this.subscriptions.push(
			this.idle.onTimeout.subscribe(() => {
				const idleState: string = 'Timed out!';
				this.timedOut = true;
				this.auth.logout();
				this.setIdleText(idleState);
				this.closeDialog();
			})
		);

		this.subscriptions.push(
			this.idle.onIdleStart.subscribe(() => {
				const idleState: string = "You've gone idle!";
				this.setIdleText(idleState);
				this.openDialog();
			})
		);

		this.subscriptions.push(
			this.idle.onTimeoutWarning.subscribe((countdown: number) => {
				const units: string =
					countdown !== 1 ? ' seconds!' : ' second!';
				const idleState: string =
					'You will time out in ' + countdown + units;
				this.setIdleText(idleState);
			})
		);

		// sets the ping interval to 15 minutes
		this.keepalive.interval(FIFTEEN_MINUTES);

		this.subscriptions.push(
			this.keepalive.onPing
				.pipe(tap(() => this.auth.pulse()))
				.subscribe(() => {
					this.lastPing = new Date();
				})
		);
	}

	private openDialog() {
		if (this.pulseDialog) {
			this.pulseDialog.close();
		}
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

	private setIdleText(text: string): void {
		this.auth.setIdleText(text);
	}

	private stopIdleAndKeepalive(): void {
		this.idle.stop();
		this.keepalive.stop();
	}

	private resetIdleAndKeepalive() {
		this.stopIdleAndKeepalive();
		this.idle.watch();
		this.keepalive.start();
		this.timedOut = false;
		this.setIdleText('Started.');
	}
}

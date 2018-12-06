import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService, UserService } from '../services/index';
import { Subscription } from 'rxjs';

@Component({
	selector: 'rar-pulse',
	templateUrl: './pulse.component.html'
})
export class PulseComponent implements OnInit, OnDestroy {
	private authSubscription: Subscription;
	public message: string = '';

	constructor(
		private auth: AuthService,
		public dialogRef: MatDialogRef<PulseComponent>
	) {}

	ngOnInit() {
		this.authSubscription = this.auth.idleText$.subscribe((text: string) => {
			this.message = text;
		});
	}

	ngOnDestroy() {
		if (this.authSubscription) {
			this.authSubscription.unsubscribe();
		}
	}

	confirmSelection() {
		this.dialogRef.close();
	}
}

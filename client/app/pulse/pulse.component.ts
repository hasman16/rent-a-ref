import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'rar-pulse',
	templateUrl: './pulse.component.html'
})
export class PulseComponent {
	public message: string = 'Crap!!!';

	constructor(public dialogRef: MatDialogRef<PulseComponent>) {}

	confirmSelection() {
		this.dialogRef.close();
	}
}

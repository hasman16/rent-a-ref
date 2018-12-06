import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import {
	MatButtonModule,
	MatButtonToggleModule,
	MatInputModule,
	MatListModule,
	MatCheckboxModule,
	MatDialogModule,
	MatMenuModule,
	MatRadioModule,
	MatTabsModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTableModule
} from '@angular/material';

const MATERIALS = [
	LayoutModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatInputModule,
	MatListModule,
	MatCheckboxModule,
	MatDialogModule,
	MatMenuModule,
	MatRadioModule,
	MatTabsModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTableModule
];

@NgModule({
	imports: [...MATERIALS],
	exports: [...MATERIALS]
})
export class MaterialModule {}

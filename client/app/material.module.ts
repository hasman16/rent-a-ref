import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

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

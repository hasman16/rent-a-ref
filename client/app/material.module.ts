import { NgModule } from '@angular/core';

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
  MatNativeDateModule
} from '@angular/material';

const MATERIALS = [
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
  MatNativeDateModule
];

@NgModule({
  imports: [...MATERIALS],
  exports: [...MATERIALS]
})
export class MaterialModule {}

import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule
  ]
})
export class MaterialModule {}

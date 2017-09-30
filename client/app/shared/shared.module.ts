import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';
import { SuspendedComponent } from '../account/profile/suspended/suspended.component';
import { DeactivatedComponent } from '../account/profile/deactivated/deactivated.component';
import { StandbyComponent } from '../account/profile/standby/standby.component';
import { PasswordresetComponent } from '../account/profile/passwordreset/passwordreset.component';
// import { RichGridComponent } from '../rich-grid-example/rich-grid.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
    ToastComponent,
    LoadingComponent
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    SuspendedComponent,
    DeactivatedComponent,
    StandbyComponent,
    PasswordresetComponent


  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }

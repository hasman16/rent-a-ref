import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent, ToastService } from './toast/index';
import { LoadingComponent } from './loading/loading.component';
import { SuspendedComponent } from '../account/profile/suspended/suspended.component';
import { DeactivatedComponent } from '../account/profile/deactivated/deactivated.component';
import { StandbyComponent } from '../account/profile/standby/standby.component';
import { PasswordresetComponent } from '../account/profile/passwordreset/passwordreset.component';
import { UploadButtonComponent } from './uploadbutton/upload-button.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
    ToastComponent,
    LoadingComponent,
    UploadButtonComponent,
    UploaderComponent,
    ImageCropperComponent
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    SuspendedComponent,
    DeactivatedComponent,
    StandbyComponent,
    PasswordresetComponent,
    UploadButtonComponent,
    UploaderComponent,
    ImageCropperComponent
  ],
  providers: [ToastComponent, ToastService]
})
export class SharedModule {}

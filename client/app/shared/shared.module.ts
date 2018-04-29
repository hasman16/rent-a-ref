import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpModule } from '@angular/http';

import { ToastComponent, ToastService } from './toast/index';
import { LoaderComponent, LoaderService } from './loader/index';
import { LoadingComponent } from './loading/loading.component';
import { SuspendedComponent } from '../account/profile/suspended/suspended.component';
import { DeactivatedComponent } from '../account/profile/deactivated/deactivated.component';
import { StandbyComponent } from '../account/profile/standby/standby.component';
import { PasswordresetComponent } from '../account/profile/passwordreset/passwordreset.component';
import { UploadButtonComponent } from './uploadbutton/upload-button.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { MaterialModule } from '../material.module';
import {
  CropImageModalComponent,
  CropImageModalService
} from './crop-image-modal/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    ImageCropperModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
    ModalComponent,
    ToastComponent,
    LoaderComponent,
    LoadingComponent,
    UploadButtonComponent,
    UploaderComponent,
    CropImageModalComponent
  ],
  declarations: [
    ToastComponent,
    LoaderComponent,
    LoadingComponent,
    SuspendedComponent,
    DeactivatedComponent,
    StandbyComponent,
    PasswordresetComponent,
    UploadButtonComponent,
    UploaderComponent,
    ModalComponent,
    CropImageModalComponent
  ],
  providers: [
    CropImageModalService,
    LoaderService,
    ModalService,
    ToastComponent,
    ToastService
  ]
})
export class SharedModule {}

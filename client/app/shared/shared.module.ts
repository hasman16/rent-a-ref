import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpModule } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image'; //https://github.com/tjoskar/ng-lazyload-image
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';

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
import { RaRImageComponent } from './image/image.component';
import { StripeComponent } from './stripe/index';
import { MaterialModule } from '../material.module';
import { AlertModalComponent, AlertModalService } from './alert-modal/index';
import {
    CropImageModalComponent,
    CropImageModalService
} from './crop-image-modal/index';
import {
    FormlyHorizontalWrapper,
    FormlyHorizontalRadioWrapper,
    FormlyHorizontalTextAreaWrapper,
    RepeatTypeComponent,
    DatepickerTypeComponent
} from './formly/index';
import { BaseFormComponent } from './formly/base-form/base-form.component';
import { OrganizationFormComponent } from './forms/organization-form/organization-form.component';
import { EventsFormComponent } from './forms/events-form/events-form.component';
import { MatchesFormComponent } from './forms/matches-form/matches-form.component';
import { SearchBoxComponent } from './search-box/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpModule,
        ImageCropperModule,
        LazyLoadImageModule,
        //FormlyBootstrapModule,
        FormlyMaterialModule,
        FormlyModule.forRoot({
            wrappers: [
                {
                    name: 'horizontalWrapper',
                    component: FormlyHorizontalWrapper
                },
                {
                    name: 'horizontalRadioWrapper',
                    component: FormlyHorizontalRadioWrapper
                },
                {
                    name: 'horizontalTextareaWrapper',
                    component: FormlyHorizontalTextAreaWrapper
                }
            ],
            types: [
                {
                    name: 'horizontalInput',
                    extends: 'input',
                    wrappers: ['fieldset', 'horizontalWrapper']
                },
                {
                    name: 'horizontalRadio',
                    extends: 'radio',
                    wrappers: ['fieldset', 'horizontalRadioWrapper']
                },
                {
                    name: 'horizontalTextarea',
                    extends: 'textarea',
                    wrappers: ['fieldset', 'horizontalTextareaWrapper']
                },
                { name: 'repeat', component: RepeatTypeComponent },
                {
                    name: 'datepicker',
                    component: DatepickerTypeComponent,
                    wrappers: ['form-field'],
                    defaultOptions: {
                      defaultValue: new Date(),
                      templateOptions: {
                        datepickerOptions: {},
                      },
                    },
                }
            ]
        })
    ],
    exports: [
        // Shared Modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        FormlyMaterialModule,

        // Shared Components
        ModalComponent,
        ToastComponent,
        LoaderComponent,
        LoadingComponent,
        AlertModalComponent,
        UploadButtonComponent,
        UploaderComponent,
        CropImageModalComponent,
        RaRImageComponent,
        StripeComponent,
        BaseFormComponent,
        OrganizationFormComponent,
        EventsFormComponent,
        MatchesFormComponent,
        SearchBoxComponent,
        DatepickerTypeComponent
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
        AlertModalComponent,
        CropImageModalComponent,
        RaRImageComponent,
        StripeComponent,
        BaseFormComponent,
        OrganizationFormComponent,
        EventsFormComponent,
        MatchesFormComponent,
        SearchBoxComponent,
        DatepickerTypeComponent
    ],
    providers: [
        AlertModalService,
        CropImageModalService,
        LoaderService,
        ToastComponent,
        ToastService
    ]
})
export class SharedModule {}

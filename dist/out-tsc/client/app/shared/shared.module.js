"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ngx_image_cropper_1 = require("ngx-image-cropper");
var http_1 = require("@angular/http");
var ng_lazyload_image_1 = require("ng-lazyload-image"); //https://github.com/tjoskar/ng-lazyload-image
var core_2 = require("@ngx-formly/core");
var material_1 = require("@ngx-formly/material");
var index_1 = require("./toast/index");
var index_2 = require("./loader/index");
var loading_component_1 = require("./loading/loading.component");
var suspended_component_1 = require("../account/profile/suspended/suspended.component");
var deactivated_component_1 = require("../account/profile/deactivated/deactivated.component");
var standby_component_1 = require("../account/profile/standby/standby.component");
var passwordreset_component_1 = require("../account/profile/passwordreset/passwordreset.component");
var upload_button_component_1 = require("./uploadbutton/upload-button.component");
var uploader_component_1 = require("./uploader/uploader.component");
var modal_component_1 = require("./modal/modal.component");
var image_component_1 = require("./image/image.component");
var index_3 = require("./stripe/index");
var material_module_1 = require("../material.module");
var index_4 = require("./crop-image-modal/index");
var index_5 = require("./formly/index");
var base_form_component_1 = require("./formly/base-form/base-form.component");
var organization_form_component_1 = require("./forms/organization-form/organization-form.component");
var events_form_component_1 = require("./forms/events-form/events-form.component");
var matches_form_component_1 = require("./forms/matches-form/matches-form.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ngx_image_cropper_1.ImageCropperModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                //FormlyBootstrapModule,
                material_1.FormlyMaterialModule,
                core_2.FormlyModule.forRoot({
                    wrappers: [
                        {
                            name: 'horizontalWrapper',
                            component: index_5.FormlyHorizontalWrapper
                        },
                        {
                            name: 'horizontalRadioWrapper',
                            component: index_5.FormlyHorizontalRadioWrapper
                        },
                        {
                            name: 'horizontalTextareaWrapper',
                            component: index_5.FormlyHorizontalTextAreaWrapper
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
                        { name: 'repeat', component: index_5.RepeatTypeComponent }
                    ]
                })
            ],
            exports: [
                // Shared Modules
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                material_1.FormlyMaterialModule,
                // Shared Components
                modal_component_1.ModalComponent,
                index_1.ToastComponent,
                index_2.LoaderComponent,
                loading_component_1.LoadingComponent,
                upload_button_component_1.UploadButtonComponent,
                uploader_component_1.UploaderComponent,
                index_4.CropImageModalComponent,
                image_component_1.RaRImageComponent,
                index_3.StripeComponent,
                base_form_component_1.BaseFormComponent,
                organization_form_component_1.OrganizationFormComponent,
                events_form_component_1.EventsFormComponent,
                matches_form_component_1.MatchesFormComponent
            ],
            declarations: [
                index_1.ToastComponent,
                index_2.LoaderComponent,
                loading_component_1.LoadingComponent,
                suspended_component_1.SuspendedComponent,
                deactivated_component_1.DeactivatedComponent,
                standby_component_1.StandbyComponent,
                passwordreset_component_1.PasswordresetComponent,
                upload_button_component_1.UploadButtonComponent,
                uploader_component_1.UploaderComponent,
                modal_component_1.ModalComponent,
                index_4.CropImageModalComponent,
                image_component_1.RaRImageComponent,
                index_3.StripeComponent,
                base_form_component_1.BaseFormComponent,
                organization_form_component_1.OrganizationFormComponent,
                events_form_component_1.EventsFormComponent,
                matches_form_component_1.MatchesFormComponent
            ],
            providers: [
                index_4.CropImageModalService,
                index_2.LoaderService,
                index_1.ToastComponent,
                index_1.ToastService
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var ng_recaptcha_1 = require("ng-recaptcha");
/* Modules */
var platform_browser_1 = require("@angular/platform-browser");
var core_module_1 = require("./services/core.module");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var material_module_1 = require("./material.module");
var core_2 = require("@ngx-formly/core");
var material_1 = require("@ngx-formly/material");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var ngx_image_cropper_1 = require("ngx-image-cropper");
var http_1 = require("@angular/common/http");
var routing_module_1 = require("./routing.module");
var shared_module_1 = require("./shared/shared.module");
var common_1 = require("@angular/common");
var core_3 = require("@agm/core");
var google_map_component_1 = require("./googlemap/google-map.component");
/* Components */
var about_component_1 = require("./about/about.component");
var account_component_1 = require("./account/account.component");
var address_form_component_1 = require("./shared/forms/address-form/address-form.component");
var horizontal_address_form_component_1 = require("./shared/forms/address-form/horizontal-address-form/horizontal-address-form.component");
var admin_component_1 = require("./admin/admin.component");
var app_component_1 = require("./app.component");
var bio_form_component_1 = require("./shared/forms/bio-form/bio-form.component");
var blog_component_1 = require("./group/blog/blog.component");
var careers_component_1 = require("./group/careers/careers.component");
var carousel_component_1 = require("./carousel/carousel.component");
var carousel_item_component_1 = require("./carousel/carousel-item/carousel-item.component");
var contactus_component_1 = require("./group/contactus/contactus.component");
var edit_profile_component_1 = require("./account/profile/edit-profile/edit-profile.component");
var index_1 = require("./organize/events/index");
var event_order_table_component_1 = require("./organize/event-order-table/event-order-table.component");
var faq_component_1 = require("./group/faq/faq.component");
var footer_component_1 = require("./footer/footer.component");
var footer_tablet_component_1 = require("./footer/footer-tablet/footer-tablet.component");
var index_2 = require("./footer/index");
var header_component_1 = require("./header/header.component");
var home_component_1 = require("./home/home.component");
var how_it_works_component_1 = require("./home/how-it-works/how-it-works.component");
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var not_found_component_1 = require("./not-found/not-found.component");
var organize_component_1 = require("./organize/organize.component");
var partners_component_1 = require("./group/partners/partners.component");
var password_form_component_1 = require("./shared/forms/password-form/password-form.component");
var phone_form_component_1 = require("./shared/forms/phone-form/phone-form.component");
var pricing_component_1 = require("./home/pricing/pricing.component");
var profile_component_1 = require("./account/profile/profile.component");
var manage_users_component_1 = require("./admin/manageusers/manage-users.component");
var register_component_1 = require("./register/register.component");
var reset_component_1 = require("./account/profile/reset/reset.component");
var resetpassword_component_1 = require("./resetpassword/resetpassword.component");
var schedule_component_1 = require("./account/schedule/schedule.component");
var terms_and_conditions_component_1 = require("./group/terms-and-conditions/terms-and-conditions.component");
var zone_form_component_1 = require("./shared/forms/zone-form/zone-form.component");
var manage_events_component_1 = require("./admin/manageevents/manage-events.component");
var matches_component_1 = require("./matches/matches.component");
/* Misc. */
var dropdown_directive_1 = require("./shared/dropdown.directive");
var mydatepicker_1 = require("mydatepicker");
// rich grid
var admin_menu_component_1 = require("./admin/adminmenu/admin-menu.component");
var index_3 = require("./shared/formly/index");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                about_component_1.AboutComponent,
                account_component_1.AccountComponent,
                address_form_component_1.AddressFormComponent,
                horizontal_address_form_component_1.HorizontalAddressFormComponent,
                admin_component_1.AdminComponent,
                bio_form_component_1.BioFormComponent,
                blog_component_1.BlogComponent,
                careers_component_1.CareersComponent,
                carousel_component_1.CarouselComponent,
                carousel_item_component_1.CarouselItemComponent,
                contactus_component_1.ContactUsComponent,
                dropdown_directive_1.DropdownDirective,
                edit_profile_component_1.EditProfileComponent,
                index_1.EventsComponent,
                event_order_table_component_1.EventOrderTableComponent,
                faq_component_1.FaqComponent,
                footer_component_1.FooterComponent,
                footer_tablet_component_1.FooterTabletComponent,
                index_2.PrivacyModalComponent,
                index_2.TermsModalComponent,
                google_map_component_1.GoogleMapComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                how_it_works_component_1.HowItWorksComponent,
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                not_found_component_1.NotFoundComponent,
                organize_component_1.OrganizeComponent,
                partners_component_1.PartnersComponent,
                password_form_component_1.PasswordFormComponent,
                phone_form_component_1.PhoneFormComponent,
                pricing_component_1.PricingComponent,
                profile_component_1.ProfileComponent,
                manage_users_component_1.ManageUsersComponent,
                manage_events_component_1.ManageEventsComponent,
                matches_component_1.MatchesComponent,
                register_component_1.RegisterComponent,
                reset_component_1.ResetComponent,
                resetpassword_component_1.ResetPasswordComponent,
                schedule_component_1.ScheduleComponent,
                terms_and_conditions_component_1.TermsAndConditionsComponent,
                zone_form_component_1.ZoneFormComponent,
                admin_menu_component_1.AdminMenuComponent,
                index_3.RepeatTypeComponent,
                index_3.FormlyHorizontalWrapper,
                index_3.FormlyHorizontalRadioWrapper,
                index_3.FormlyHorizontalTextAreaWrapper
            ],
            imports: [
                platform_browser_1.BrowserModule,
                core_3.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCIYjs8M-co1PL-iDZVP8rIiHIxAN-RYaI'
                }),
                ngx_datatable_1.NgxDatatableModule,
                routing_module_1.RoutingModule,
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                //FormlyBootstrapModule,
                material_1.FormlyMaterialModule,
                core_2.FormlyModule.forRoot({
                    wrappers: [
                        {
                            name: 'horizontalWrapper',
                            component: index_3.FormlyHorizontalWrapper
                        },
                        {
                            name: 'horizontalRadioWrapper',
                            component: index_3.FormlyHorizontalRadioWrapper
                        },
                        {
                            name: 'horizontalTextareaWrapper',
                            component: index_3.FormlyHorizontalTextAreaWrapper
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
                        { name: 'repeat', component: index_3.RepeatTypeComponent }
                    ]
                }),
                ng_recaptcha_1.RecaptchaModule.forRoot(),
                http_1.HttpClientModule,
                mydatepicker_1.MyDatePickerModule,
                ngx_image_cropper_1.ImageCropperModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                core_module_1.CoreModule,
                common_1.CommonModule
            ],
            providers: [index_1.EventsComponentService],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            // Add bootstrap
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
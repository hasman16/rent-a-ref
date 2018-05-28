import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule } from 'ng-recaptcha';
/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './services/core.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { RepeatTypeComponent } from './shared/formly/repeat-section/repeat-section.type';
import {
    FormlyHorizontalWrapper,
    FormlyHorizontalRadioWrapper,
    FormlyHorizontalTextAreaWrapper
} from './shared/formly/horizontal-types/index';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './googlemap/google-map.component';

/* Components */
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AddressFormComponent } from './shared/forms/address-form/address-form.component';
import { HorizontalAddressFormComponent } from './shared/forms/address-form/horizontal-address-form/horizontal-address-form.component';
import { OrganizationFormComponent } from './shared/forms/organization-form/organization-form.component';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { BioFormComponent } from './shared/forms/bio-form/bio-form.component';
import { BlogComponent } from './group/blog/blog.component';
import { CareersComponent } from './group/careers/careers.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { ContactUsComponent } from './group/contactus/contactus.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { EventsComponent } from './organize/events/events.component';
import { EventOrderTableComponent } from './organize/event-order-table/event-order-table.component';

import { FaqComponent } from './group/faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { FooterTabletComponent } from './footer/footer-tablet/footer-tablet.component';
import { PrivacyModalComponent, TermsModalComponent } from './footer/index';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizeComponent } from './organize/organize.component';

import { PartnersComponent } from './group/partners/partners.component';
import { PasswordFormComponent } from './shared/forms/password-form/password-form.component';
import { PhoneFormComponent } from './shared/forms/phone-form/phone-form.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ManageUsersComponent } from './admin/manageusers/manage-users.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './account/profile/reset/reset.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { BaseFormComponent } from './shared/formly/base-form/base-form.component';
import { ScheduleComponent } from './account/schedule/schedule.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { ZoneFormComponent } from './shared/forms/zone-form/zone-form.component';
import { ManageEventsComponent } from './admin/manageevents/manage-events.component';

/* Misc. */
import { DropdownDirective } from './shared/dropdown.directive';
import { Routes, RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';

// rich grid
import { AdminMenuComponent } from './admin/adminmenu/admin-menu.component';
//import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        AccountComponent,
        AddressFormComponent,
        HorizontalAddressFormComponent,
        OrganizationFormComponent,
        AdminComponent,
        BioFormComponent,
        BlogComponent,
        CareersComponent,
        CarouselComponent,
        CarouselItemComponent,
        ContactUsComponent,
        DropdownDirective,
        EditProfileComponent,
        EventsComponent,
        EventOrderTableComponent,
        FaqComponent,
        FormlyHorizontalWrapper,
        FormlyHorizontalRadioWrapper,
        FormlyHorizontalTextAreaWrapper,
        FooterComponent,
        FooterTabletComponent,
        PrivacyModalComponent,
        TermsModalComponent,
        GoogleMapComponent,
        HeaderComponent,
        HomeComponent,
        HowItWorksComponent,
        LoginComponent,
        LogoutComponent,
        NotFoundComponent,
        OrganizeComponent,
        PartnersComponent,
        PasswordFormComponent,
        PhoneFormComponent,
        PricingComponent,
        ProfileComponent,
        ManageUsersComponent,
        ManageEventsComponent,
        RegisterComponent,
        RepeatTypeComponent,
        ResetComponent,
        ResetPasswordComponent,
        BaseFormComponent,
        ScheduleComponent,
        TermsAndConditionsComponent,
        ZoneFormComponent,
        AdminMenuComponent
        //        BarchartComponent
    ],
    imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCIYjs8M-co1PL-iDZVP8rIiHIxAN-RYaI'
        }),
        NgxDatatableModule,

        RoutingModule,
        SharedModule,

        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
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
                { name: 'repeat', component: RepeatTypeComponent }
            ]
        }),
        HttpClientModule,
        MyDatePickerModule,
        ImageCropperModule,
        NgbModule.forRoot(),
        CoreModule,
        CommonModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // Add bootstrap
    bootstrap: [AppComponent]
})
export class AppModule {}

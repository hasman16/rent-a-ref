import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './providers/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule } from 'ng-recaptcha';
/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

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
import { LoaderComponent, LoaderService } from './shared/loader/index';

/* Services */
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from './services/profile.service';
import { StatesService } from './services/states.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { OrganizeService } from './services/organize.service';
import { PagingService } from './services/paging.service';
import { EventsService } from './services/events.service';

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { CardModule } from 'primeng/card';

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
import { FaqComponent } from './group/faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { FooterTabletComponent } from './footer/footer-tablet/footer-tablet.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizeComponent } from './organize/organize.component';
import { CropImageModalComponent } from './organize/crop-image-modal/crop-image-modal.component';

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
import { StripeComponent } from './organize/stripe/stripe.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { ZoneFormComponent } from './shared/forms/zone-form/zone-form.component';
import { ManageEventsComponent } from './admin/manageevents/manage-events.component';

/* Misc. */
import { DropdownDirective } from './shared/dropdown.directive';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';

// rich grid
import { AdminMenuComponent } from './admin/adminmenu/admin-menu.component';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent,
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
        FaqComponent,
        FormlyHorizontalWrapper,
        FormlyHorizontalRadioWrapper,
        FormlyHorizontalTextAreaWrapper,
        FooterComponent,
        FooterTabletComponent,
        GoogleMapComponent,
        HeaderComponent,
        HomeComponent,
        HowItWorksComponent,
        LoginComponent,
        LogoutComponent,
        NotFoundComponent,
        OrganizeComponent,
        CropImageModalComponent,
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
        StripeComponent,
        TermsAndConditionsComponent,
        ZoneFormComponent,
        AdminMenuComponent,
        BarchartComponent
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
        AccordionModule,
        PanelModule,
        ButtonModule,
        RadioButtonModule,
        CardModule,
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
        CommonModule
    ],
    providers: [
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        TokenService,
        ProfileService,
        StatesService,
        UserService,
        OrganizeService,
        EventsService,
        CookieService,
        CanDeactivateGuardService,
        LoaderService,
        PagingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // Add bootstrap
    bootstrap: [AppComponent]
})
export class AppModule {}

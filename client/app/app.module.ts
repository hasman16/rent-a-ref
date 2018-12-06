import { environment } from './environments/environment';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { TourMatMenuModule } from 'ngx-tour-md-menu';

import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { CoreModule } from './services/core.module';
import { SharedModule } from './shared/shared.module';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; // agm-direction
import { GoogleMapComponent } from './googlemap/index';

/* Components */
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AddressFormComponent } from './shared/forms/address-form/address-form.component';
import { HorizontalAddressFormComponent } from './shared/forms/address-form/horizontal-address-form/horizontal-address-form.component';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { BioFormComponent } from './shared/forms/bio-form/bio-form.component';
import { BlogComponent } from './group/blog/blog.component';
import { EditPostComponent } from './group/blog/edit-post/edit-post.component';
import { CreatePostComponent } from './group/blog/create-post/create-post.component';
import { CareersComponent } from './group/careers/careers.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { ContactUsComponent } from './group/contactus/contactus.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import {
	MeetingsComponent,
	MeetingsComponentService
} from './organize/meetings/index';

import { MeetingOrderTableComponent } from './organize/meeting-order-table/meeting-order-table.component';

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
import {
	AdminProfileComponent,
	ProfileComponent
} from './account/profile/index';
import { ManageUsersComponent } from './admin/manageusers/manage-users.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './account/profile/reset/reset.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { AdminScheduleComponent } from './schedule/admin-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { ZoneFormComponent } from './shared/forms/zone-form/zone-form.component';
import { ManageMeetingsComponent } from './admin/managemeetings/manage-meetings.component';
import {
	MatchesComponent,
	MatchDetailComponent,
	RefereeDetailsModalComponent
} from './matches/index';
import { AssignUsersComponent } from './assign-users/assign-users.component';
import { PulseComponent } from './pulse/pulse.component';

/* Misc. */
import { DropdownDirective } from './shared/dropdown.directive';
import { MyDatePickerModule } from 'mydatepicker';

// rich grid
import { AdminMenuComponent } from './admin/adminmenu/admin-menu.component';
import {
	FormlyHorizontalWrapper,
	FormlyHorizontalRadioWrapper,
	FormlyHorizontalTextAreaWrapper,
	RepeatTypeComponent
} from './shared/formly/index';
import { RefereePositionPipe } from './shared/position-pipe/index';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		AccountComponent,
		AddressFormComponent,
		HorizontalAddressFormComponent,
		AdminComponent,
		BioFormComponent,
		BlogComponent,
		EditPostComponent,
		CreatePostComponent,
		CareersComponent,
		CarouselComponent,
		CarouselItemComponent,
		ContactUsComponent,
		DropdownDirective,
		EditProfileComponent,
		MeetingsComponent,
		MeetingOrderTableComponent,
		FaqComponent,
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
		PulseComponent,
		AdminProfileComponent,
		ProfileComponent,
		ManageUsersComponent,
		ManageMeetingsComponent,
		MatchesComponent,
		MatchDetailComponent,
		AssignUsersComponent,
		RefereeDetailsModalComponent,
		RegisterComponent,
		ResetComponent,
		ResetPasswordComponent,
		AdminScheduleComponent,
		ScheduleComponent,
		TermsAndConditionsComponent,
		ZoneFormComponent,
		AdminMenuComponent,
		RepeatTypeComponent,
		FormlyHorizontalWrapper,
		FormlyHorizontalRadioWrapper,
		FormlyHorizontalTextAreaWrapper,
		RefereePositionPipe
	],
	imports: [
		BrowserModule,
		AgmCoreModule.forRoot({
			apiKey: environment.GOOGLEMAPS_KEY,
			libraries: ['places']
		}),
		AgmDirectionModule,
		NgxDatatableModule,

		RoutingModule,
		SharedModule,

		MaterialModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		//FormlyMaterialModule,
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
		RecaptchaModule.forRoot(),

		HttpClientModule,
		MyDatePickerModule,
		ImageCropperModule,
		TourMatMenuModule.forRoot(),
		NgbModule.forRoot(),
		NgIdleKeepaliveModule.forRoot(),
		CoreModule,
		CommonModule
	],
	providers: [MeetingsComponentService, GoogleMapsAPIWrapper],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// Add bootstrap
	bootstrap: [AppComponent],
	entryComponents: [PulseComponent]
})
export class AppModule {}

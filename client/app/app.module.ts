import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';

/* Services */
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from './services/profile.service';
import { StatesService } from './services/states.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

/* Components */
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AddressFormComponent } from './account/profile/edit-profile/address-form/address-form.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './group/blog/blog.component';
import { CareersComponent } from './group/careers/careers.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { ContactusComponent } from './group/contactus/contactus.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { FaqComponent } from './group/faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { FooterTabletComponent } from './footer/footer-tablet/footer-tablet.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartnersComponent } from './group/partners/partners.component';
import { PasswordFormComponent } from './account/profile/edit-profile/password-form/password-form.component';
import { PhoneFormComponent } from './account/profile/edit-profile/phone-form/phone-form.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RefereeComponent } from './referee/referee.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';

/* Misc. */
import { DropdownDirective } from './shared/dropdown.directive';
import { ResetComponent } from './account/profile/reset/reset.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { ScheduleComponent } from './account/schedule/schedule.component';
import { OrganizeComponent } from './organize/organize.component';
// import { GoogleRecaptchaDirective } from './shared/googlerecaptcha.directive';

// import { Ng2GoogleRecaptchaModule } from 'ng2-google-recaptcha';

// import { StatisticsComponent } from './shared/statistics/statistics.component';

// import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'referee', component: RefereeComponent },
  { path: 'career', component: CareersComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactusComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccountComponent,
    AddressFormComponent,
    AdminComponent,
    BlogComponent,
    CareersComponent,
    CarouselComponent,
    CarouselItemComponent,
    ContactusComponent,
    DropdownDirective,
    EditProfileComponent,
    FaqComponent,
    FooterComponent,
    FooterTabletComponent,
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
    RefereeComponent,
    RegisterComponent,
    ResetComponent,
    ResetPasswordComponent,
    ScheduleComponent,
    TermsAndConditionsComponent

    // GoogleRecaptchaDirective

    // StatisticsComponent
    // GoogleChart
  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    RouterModule.forRoot(routes)
    // Ng2GoogleRecaptchaModule

    // Ng2GoogleChartsModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    TokenService,
    ProfileService,
    StatesService,
    UserService,
    CookieService,
    CanDeactivateGuardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // Add bootstrap
  bootstrap: [AppComponent]
})

export class AppModule { }

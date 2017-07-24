import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RefereeComponent } from './referee/referee.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { FooterTabletComponent } from './footer/footer-tablet/footer-tablet.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { StatisticsComponent } from './shared/statistics/statistics.component';
// import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    HeaderComponent,
    DropdownDirective,
   HomeComponent,
    FooterComponent,
    HowItWorksComponent,
    PricingComponent,
    ProfileComponent,
    EditProfileComponent,
    FooterTabletComponent,
    CarouselItemComponent,
    CarouselComponent,
    RefereeComponent
    // StatisticsComponent
    // GoogleChart
  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule
    // Ng2GoogleChartsModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // Add bootstrap
  bootstrap: [AppComponent]
})

export class AppModule { }

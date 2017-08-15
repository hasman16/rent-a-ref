import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { ProfileComponent } from './account/profile/profile.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { RefereeComponent } from './referee/referee.component';
import { PartnersComponent} from './group/partners/partners.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { CareersComponent } from './group/careers/careers.component';
import { FaqComponent } from './group/faq/faq.component';
import { ContactusComponent } from './group/contactus/contactus.component';
import { BlogComponent } from './group/blog/blog.component';
import { SuspendedComponent } from './account/profile/suspended/suspended.component';
import { DeactivatedComponent } from './account/profile/deactivated/deactivated.component';
import { StandbyComponent } from './account/profile/standby/standby.component';
import { PasswordresetComponent } from './account/profile/passwordreset/passwordreset.component';

  const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'referee', component: RefereeComponent },
  { path: 'career', component: CareersComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'passwordreset', component: PasswordresetComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'user/:id/account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'user/:id/edit-profile', component: EditProfileComponent },
  { path: 'user/:id/standby', component: StandbyComponent },
  { path: 'user/:id/suspended', component: SuspendedComponent },
  { path: 'user/:id/deactivated', component: DeactivatedComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } // For debugging purposes only
  )],
  exports: [RouterModule]
})

export class RoutingModule {}

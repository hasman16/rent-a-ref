import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './group/blog/blog.component';
import { CareersComponent } from './group/careers/careers.component';
import { ContactusComponent } from './group/contactus/contactus.component';
import { DeactivatedComponent } from './account/profile/deactivated/deactivated.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { FaqComponent } from './group/faq/faq.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartnersComponent } from './group/partners/partners.component';
import { PasswordresetComponent } from './account/profile/passwordreset/passwordreset.component';
import { PricingComponent } from './home/pricing/pricing.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RefereeComponent } from './referee/referee.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { StandbyComponent } from './account/profile/standby/standby.component';
import { SuspendedComponent } from './account/profile/suspended/suspended.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { ResetComponent } from './account/profile/reset/reset.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { ScheduleComponent } from './account/schedule/schedule.component';
import { OrganizeComponent } from './organize/organize.component';
import { GamesComponent } from './games/games.component';
// import { RichGridComponent } from './rich-grid-example/rich-grid.component';

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
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'resetpassword/:passcode', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'passwordreset', component: PasswordresetComponent },
  { path: 'reset', component: ResetComponent },
  // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  {
    path: 'account/:id', component: AccountComponent, canActivate: [AuthGuardLogin]
  },
    {
      path: 'account/:id/schedule', component: ScheduleComponent, canActivate: [AuthGuardLogin]
  },
    {
      path: 'organizer/:id', component: OrganizeComponent, canActivate: [AuthGuardLogin]
    },
  {
    path: 'account/profile/:id', component: ProfileComponent, canDeactivate: [CanDeactivateGuardService],
    children: [
      { path: 'edit-profile', component: EditProfileComponent }
    ] },
  // { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardAdmin] },
  // { path: 'account/profile/:id/edit-profile', component: EditProfileComponent },
  { path: 'account/standby/:id', component: StandbyComponent },
  { path: 'account/suspended/:id', component: SuspendedComponent },
  { path: 'account/deactivated/:id', component: DeactivatedComponent },
  { path: 'account/admin/:id', component: AdminComponent, canActivate: [AuthGuardAdmin], canDeactivate: [CanDeactivateGuardService] },
  { path: 'officials', component: RefereeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } // For debugging purposes only
  )],
  exports: [RouterModule]
})

export class RoutingModule { }

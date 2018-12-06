import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	AuthGuardAdmin,
	AuthGuardLocked,
	AuthGuardLogin,
	AuthGuardSuspended,
	CanDeactivateGuardService,
	AdminMeetingResolver,
	MeetingResolver,
	OrganizationsResolver,
	ScheduleResolver,
	BlogResolver,
	SportsResolver,
	UserResolver
} from './services/index';

import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './group/blog/blog.component';
import { EditPostComponent } from './group/blog/edit-post/edit-post.component';
import { CareersComponent } from './group/careers/careers.component';
import { ContactUsComponent } from './group/contactus/contactus.component';
import { DeactivatedComponent } from './account/profile/deactivated/deactivated.component';
import { EditProfileComponent } from './account/profile/edit-profile/edit-profile.component';
import { CreatePostComponent } from './group/blog/create-post/create-post.component';
import { MeetingsComponent } from './organize/meetings/meetings.component';
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
import { ManageUsersComponent } from './admin/manageusers/manage-users.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { StandbyComponent } from './account/profile/standby/standby.component';
import { SuspendedComponent } from './account/profile/suspended/suspended.component';
import { TermsAndConditionsComponent } from './group/terms-and-conditions/terms-and-conditions.component';
import { ResetComponent } from './account/profile/reset/reset.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { OrganizeComponent } from './organize/organize.component';
import { ManageMeetingsComponent } from './admin/managemeetings/manage-meetings.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'how-it-works', component: HowItWorksComponent },
	{ path: 'admin/manageusers', component: ManageUsersComponent },
	{ path: 'career', component: CareersComponent },
	{ path: 'faq', component: FaqComponent },
	// { path: 'blog', component: BlogComponent },
	{ path: 'contact', component: ContactUsComponent },
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
	{
		path: 'account/:id',
		component: AccountComponent,
		canActivate: [AuthGuardLogin]
	},
	{
		path: 'account/:id/schedule',
		component: ScheduleComponent,
		canActivate: [AuthGuardLogin],
		resolve: {
			scheduleData: ScheduleResolver
		}
	},
	{
		path: 'blog',
		component: BlogComponent,
		canActivate: [AuthGuardLogin],
		resolve: {
			blogData: BlogResolver
		},
		children: [
			{ path: '', redirectTo: 'posts', pathMatch: 'full' },
			{
				path: 'edit-post',
				component: EditPostComponent,
				resolve: {
					blogData: BlogResolver
				}
			},
			{
				path: 'create-post',
				component: CreatePostComponent
			}
		]
	},
	/*{
    path: 'users/:id',
    component: BlogComponent,
    canActivate: [AuthGuardLogin],
        resolve: {
      blogData: BlogResolver
    },
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'edit-post',
        component: EditPostComponent,
        resolve: {
          blogData: BlogResolver
        }
      },
      {
        path: 'create-post',
        component: CreatePostComponent
        
      }
    ]

  },*/
	{
		path: 'organization',
		component: OrganizeComponent,
		canActivate: [AuthGuardLogin],
		resolve: {
			organizations: OrganizationsResolver,
			sportsData: SportsResolver
		}
	},
	{
		path: 'organization/:organization_id/events',
		component: MeetingsComponent,
		canActivate: [AuthGuardLogin],
		resolve: {
			meetings: MeetingResolver,
			sportsData: SportsResolver
		}
	},
	{
		path: 'account/:id/profile',
		component: ProfileComponent,
		canDeactivate: [CanDeactivateGuardService],
		children: [{ path: 'edit-profile', component: EditProfileComponent }]
	},
	{
		path: 'account/:id/standby',
		canActivate: [AuthGuardLocked],
		component: StandbyComponent
	},
	{
		path: 'account/:id/suspended',
		canActivate: [AuthGuardSuspended],
		component: SuspendedComponent
	},
	{
		path: 'account/:id/deactivated',
		canActivate: [AuthGuardLogin],
		component: DeactivatedComponent
	},
	{
		path: 'admin/:id',
		component: AdminComponent,
		canActivate: [AuthGuardAdmin],
		children: [
			{ path: '', redirectTo: 'manageevents', pathMatch: 'full' },
			{
				path: 'manageusers',
				component: ManageUsersComponent,
				resolve: {
					userData: UserResolver
				}
			},
			{
				path: 'manageevents',
				component: ManageMeetingsComponent,
				resolve: {
					meetingData: AdminMeetingResolver
				}
			}
		]
	},
	{ path: 'notfound', component: NotFoundComponent },
	{ path: '**', redirectTo: '/notfound' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{ enableTracing: true } // For debugging purposes only
		)
	],
	providers: [],
	exports: [RouterModule]
})
export class RoutingModule {}

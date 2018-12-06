import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
	AuthGuardAdmin,
	AuthGuardLogin,
	CanComponentDeactivate,
	CanDeactivateGuardService
} from './guards/index';
import {
	AuthService,
	MeetingService,
	MatchService,
	OrganizeService,
	PagingService,
	ProfileService,
	StatesService,
	StripeService,
	UserService,
	BlogService
} from './http/index';
import { TokenInterceptor, TokenService } from './interceptors/index';
import {
	AdminMeetingResolver,
	MeetingResolver,
	OrganizationsResolver,
	SportsResolver,
	ScheduleResolver,
	BlogResolver,
	UserResolver
} from './resolvers/index';
@NgModule({
	providers: [
		AuthGuardAdmin,
		AuthGuardLogin,
		AuthService,
		CanDeactivateGuardService,
		MeetingService,
		MatchService,
		OrganizeService,
		PagingService,
		ProfileService,
		StatesService,
		StripeService,
		TokenService,
		UserService,
		AdminMeetingResolver,
		MeetingResolver,
		OrganizationsResolver,
		ScheduleResolver,
		BlogResolver,
		BlogService,
		SportsResolver,
		UserResolver,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class CoreModule {}

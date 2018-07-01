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
  EventsService,
  MatchService,
  OrganizeService,
  PagingService,
  ProfileService,
  StatesService,
  StripeService,
  UserService
} from './http/index';
import { TokenInterceptor, TokenService } from './interceptors/index';
import {
  AdminEventsResolver,
  EventsResolver,
  OrganizationsResolver,
  SportsResolver,
  UserResolver
} from './resolvers/index';
@NgModule({
  providers: [
    AuthGuardAdmin,
    AuthGuardLogin,
    AuthService,
    CanDeactivateGuardService,
    EventsService,
    MatchService,
    OrganizeService,
    PagingService,
    ProfileService,
    StatesService,
    StripeService,
    TokenService,
    UserService,
    AdminEventsResolver,
    EventsResolver,
    OrganizationsResolver,
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

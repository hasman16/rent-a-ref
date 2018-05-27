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
  OrganizeService,
  PagingService,
  ProfileService,
  StatesService,
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
    OrganizeService,
    PagingService,
    ProfileService,
    StatesService,
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

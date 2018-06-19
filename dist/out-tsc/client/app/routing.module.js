"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("./services/index");
var about_component_1 = require("./about/about.component");
var account_component_1 = require("./account/account.component");
var admin_component_1 = require("./admin/admin.component");
var blog_component_1 = require("./group/blog/blog.component");
var careers_component_1 = require("./group/careers/careers.component");
var contactus_component_1 = require("./group/contactus/contactus.component");
var deactivated_component_1 = require("./account/profile/deactivated/deactivated.component");
var edit_profile_component_1 = require("./account/profile/edit-profile/edit-profile.component");
var events_component_1 = require("./organize/events/events.component");
var faq_component_1 = require("./group/faq/faq.component");
var home_component_1 = require("./home/home.component");
var how_it_works_component_1 = require("./home/how-it-works/how-it-works.component");
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var not_found_component_1 = require("./not-found/not-found.component");
var partners_component_1 = require("./group/partners/partners.component");
var passwordreset_component_1 = require("./account/profile/passwordreset/passwordreset.component");
var pricing_component_1 = require("./home/pricing/pricing.component");
var profile_component_1 = require("./account/profile/profile.component");
var manage_users_component_1 = require("./admin/manageusers/manage-users.component");
var register_component_1 = require("./register/register.component");
var resetpassword_component_1 = require("./resetpassword/resetpassword.component");
var standby_component_1 = require("./account/profile/standby/standby.component");
var suspended_component_1 = require("./account/profile/suspended/suspended.component");
var terms_and_conditions_component_1 = require("./group/terms-and-conditions/terms-and-conditions.component");
var reset_component_1 = require("./account/profile/reset/reset.component");
var schedule_component_1 = require("./account/schedule/schedule.component");
var organize_component_1 = require("./organize/organize.component");
var manage_events_component_1 = require("./admin/manageevents/manage-events.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'how-it-works', component: how_it_works_component_1.HowItWorksComponent },
    { path: 'admin/manageusers', component: manage_users_component_1.ManageUsersComponent },
    { path: 'career', component: careers_component_1.CareersComponent },
    { path: 'faq', component: faq_component_1.FaqComponent },
    { path: 'blog', component: blog_component_1.BlogComponent },
    { path: 'contact', component: contactus_component_1.ContactUsComponent },
    { path: 'pricing', component: pricing_component_1.PricingComponent },
    { path: 'partners', component: partners_component_1.PartnersComponent },
    { path: 'terms-and-conditions', component: terms_and_conditions_component_1.TermsAndConditionsComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'resetpassword', component: resetpassword_component_1.ResetPasswordComponent },
    { path: 'resetpassword/:passcode', component: resetpassword_component_1.ResetPasswordComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    { path: 'passwordreset', component: passwordreset_component_1.PasswordresetComponent },
    { path: 'reset', component: reset_component_1.ResetComponent },
    {
        path: 'account/:id',
        component: account_component_1.AccountComponent,
        canActivate: [index_1.AuthGuardLogin]
    },
    {
        path: 'account/:id/schedule',
        component: schedule_component_1.ScheduleComponent,
        canActivate: [index_1.AuthGuardLogin]
    },
    {
        path: 'organization',
        component: organize_component_1.OrganizeComponent,
        canActivate: [index_1.AuthGuardLogin],
        resolve: {
            organizations: index_1.OrganizationsResolver,
            sportsData: index_1.SportsResolver
        }
    },
    {
        path: 'organization/:organization_id/events',
        component: events_component_1.EventsComponent,
        canActivate: [index_1.AuthGuardLogin],
        resolve: {
            games: index_1.EventsResolver,
            sportsData: index_1.SportsResolver
        }
    },
    {
        path: 'account/:id/profile',
        component: profile_component_1.ProfileComponent,
        canDeactivate: [index_1.CanDeactivateGuardService],
        children: [{ path: 'edit-profile', component: edit_profile_component_1.EditProfileComponent }]
    },
    {
        path: 'account/:id/standby',
        canActivate: [index_1.AuthGuardLocked],
        component: standby_component_1.StandbyComponent
    },
    {
        path: 'account/:id/suspended',
        canActivate: [index_1.AuthGuardSuspended],
        component: suspended_component_1.SuspendedComponent
    },
    {
        path: 'account/:id/deactivated',
        canActivate: [index_1.AuthGuardLogin],
        component: deactivated_component_1.DeactivatedComponent
    },
    { path: 'admin', redirectTo: 'admin/0', pathMatch: 'full' },
    {
        path: 'admin/:id',
        component: admin_component_1.AdminComponent,
        canActivate: [index_1.AuthGuardAdmin],
        children: [
            { path: '', redirectTo: 'manageevents', pathMatch: 'full' },
            {
                path: 'manageusers',
                component: manage_users_component_1.ManageUsersComponent,
                resolve: {
                    userData: index_1.UserResolver
                }
            },
            {
                path: 'manageevents',
                component: manage_events_component_1.ManageEventsComponent,
                resolve: {
                    eventsData: index_1.AdminEventsResolver
                }
            }
        ]
    },
    { path: 'notfound', component: not_found_component_1.NotFoundComponent },
    { path: '**', redirectTo: '/notfound' }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { enableTracing: true } // For debugging purposes only
                )
            ],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], RoutingModule);
    return RoutingModule;
}());
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map
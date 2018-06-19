"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var index_1 = require("./guards/index");
var index_2 = require("./http/index");
var index_3 = require("./interceptors/index");
var index_4 = require("./resolvers/index");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            providers: [
                index_1.AuthGuardAdmin,
                index_1.AuthGuardLogin,
                index_2.AuthService,
                index_1.CanDeactivateGuardService,
                index_2.EventsService,
                index_2.OrganizeService,
                index_2.PagingService,
                index_2.ProfileService,
                index_2.StatesService,
                index_3.TokenService,
                index_2.UserService,
                index_4.AdminEventsResolver,
                index_4.EventsResolver,
                index_4.OrganizationsResolver,
                index_4.SportsResolver,
                index_4.UserResolver,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: index_3.TokenInterceptor,
                    multi: true
                }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map
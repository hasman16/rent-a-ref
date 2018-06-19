"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("./../http/index");
var AuthGuardSuspended = /** @class */ (function () {
    function AuthGuardSuspended(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardSuspended.prototype.canActivate = function () {
        var currentUser = this.auth.getCurrentUser();
        return this.auth.loggedIn && currentUser.status == 'suspended';
    };
    AuthGuardSuspended = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.AuthService, router_1.Router])
    ], AuthGuardSuspended);
    return AuthGuardSuspended;
}());
exports.AuthGuardSuspended = AuthGuardSuspended;
//# sourceMappingURL=auth-guard-suspended.service.js.map
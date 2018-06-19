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
var index_1 = require("../http/index");
var AuthGuardLogin = /** @class */ (function () {
    function AuthGuardLogin(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardLogin.prototype.canActivate = function () {
        var currentUser = this.auth.getCurrentUser();
        var result = false;
        if (this.auth.loggedIn) {
            var status_1 = currentUser.status;
            if (this.auth.isActive) {
                result = true;
            }
            else if (status_1 == 'suspended') {
                this.router.navigate(['/suspended']);
            }
            else if (status_1 == 'pending') {
                this.router.navigate(['/pending']);
            }
        }
        else {
            this.router.navigate(['/login']);
        }
        return result;
    };
    AuthGuardLogin = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.AuthService, router_1.Router])
    ], AuthGuardLogin);
    return AuthGuardLogin;
}());
exports.AuthGuardLogin = AuthGuardLogin;
//# sourceMappingURL=auth-guard-login.service.js.map
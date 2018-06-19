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
var index_1 = require("../interceptors/index");
var user_service_1 = require("./user.service");
var _ = require("lodash");
var AuthService = /** @class */ (function () {
    function AuthService(userService, tokenService, router) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.router = router;
        this.loggedIn = false;
        this.isAdmin = false;
        this.isActive = false;
        this.currentUser = {};
        var user = localStorage.getItem('user');
        if (user) {
            this.setCurrentUser(JSON.parse(user));
        }
    }
    AuthService.prototype.resetState = function () {
        localStorage.removeItem('user');
        this.loggedIn = false;
        this.isAdmin = false;
        this.isActive = false;
        this.currentUser = {};
    };
    AuthService.prototype.getCurrentUser = function () {
        return _.cloneDeep(this.currentUser);
    };
    AuthService.prototype.login = function (emailAndPassword) {
        var _this = this;
        return this.userService.login(emailAndPassword).do(function (login) {
            _this.setCurrentUser({
                user: login.user,
                token: login.token
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.resetState();
        this.setCurrentUser(null);
        this.router.navigate(['/']);
    };
    AuthService.prototype.resetpassword = function (payload) {
        return this.userService
            .resetpassword(payload)
            .take(1)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.setCurrentUser = function (setter) {
        this.resetState();
        this.tokenService.setOptions(null);
        if (setter) {
            var newUser = setter.user;
            var authorization = newUser.authorization;
            this.loggedIn = true;
            this.currentUser = newUser;
            this.currentUser.email = newUser.email;
            this.currentUser.id = newUser.id;
            this.currentUser.firstname = setter.user.firstname;
            this.currentUser.lastname = setter.user.lastname;
            if (setter.user.can_organize === 'yes') {
                this.currentUser.role = 'Organizer';
            }
            if (setter.user.can_referee === 'yes') {
                this.currentUser.role = 'Referee';
            }
            this.isAdmin = authorization === 1 || authorization === 2;
            this.isActive = newUser.status == 'active';
            this.tokenService.setOptions(setter.token);
            localStorage.setItem('user', JSON.stringify(setter));
        }
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService,
            index_1.TokenService,
            router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
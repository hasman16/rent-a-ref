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
var toast_component_1 = require("../shared/toast/toast.component");
var index_1 = require("../services/index");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(auth, toast, userService) {
        this.auth = auth;
        this.toast = toast;
        this.userService = userService;
        this.user = {};
        this.person = {};
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    AccountComponent.prototype.getProfile = function () {
        var _this = this;
        var currentUser = this.auth.getCurrentUser();
        this.userService.getProfile(currentUser.id).subscribe(function (res) {
            _this.user = {
                id: String(res.id),
                email: res.email,
                authorization: String(res.authorization),
                firstname: res.person.firstname,
                lastname: res.person.lastname,
                role: '',
                person_id: String(res.person.id),
                can_referee: res.can_referee,
                can_organize: res.can_organize,
                status: res.status
            };
            _this.person = res.person;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile');
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile');
            }
            // this.isLoading = false;
            if (!_this.auth.loggedIn) {
                // this.abort = true;
                _this.auth.logout();
            }
        });
    };
    AccountComponent.prototype.onActivate = function () {
        // Activate the account as Organizer
    };
    AccountComponent.prototype.onOrganize = function () {
        // events or request referee(s) as Organizer
    };
    AccountComponent.prototype.onRefereeActivate = function () {
        // Become a refereee
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'app-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.scss']
        }),
        __metadata("design:paramtypes", [index_1.AuthService,
            toast_component_1.ToastComponent,
            index_1.UserService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map
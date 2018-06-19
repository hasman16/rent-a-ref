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
var forms_1 = require("@angular/forms");
var toast_component_1 = require("../shared/toast/toast.component");
var index_1 = require("../services/index");
require("rxjs/add/operator/take");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, toast) {
        this.auth = auth;
        this.router = router;
        this.toast = toast;
        this.cookieValue = 'UNKNOWN';
        this.cookieCheck = false;
        this.checkboxFlag = false;
        this.form = new forms_1.FormGroup({});
        this.model = {};
        this.options = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.fields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'email',
                    placeholder: 'Email Address',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'password',
                    placeholder: 'Password',
                    required: true,
                    minLength: 5
                }
            }
        ];
    };
    LoginComponent.prototype.forgot = function () {
        this.router.navigate(['passwordreset']);
    };
    LoginComponent.prototype.redirectUser = function (userStatus, userId) {
        var path = '';
        switch (userStatus) {
            case 'active':
                path = "account/" + userId + "/profile";
                break;
            case 'pending':
                path = "account/" + userId + "/standby";
                break;
            case 'locked':
                path = "account/" + userId + "/suspended";
                break;
            case 'banned':
                path = "account/" + userId + "/deactivated";
                this.auth.resetState();
                break;
            default:
                path = '/';
                this.auth.resetState();
                break;
        }
        return path;
    };
    LoginComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.auth
            .login(data)
            .take(1)
            .subscribe(function (login) {
            var user = login.user;
            var userId = user.id;
            var userStatus = user.status;
            var path = _this.redirectUser(userStatus, userId);
            _this.router.navigate([path]);
        }, function (err) {
            if (err.error instanceof Error) {
                _this.toast.setMessage('invalid email or password! ', 'danger');
            }
            else {
                _this.toast.setMessage('invalid email or password! ', 'danger');
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [index_1.AuthService,
            router_1.Router,
            toast_component_1.ToastComponent])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
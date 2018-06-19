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
var index_1 = require("../services/index");
var toast_component_1 = require("../shared/toast/toast.component");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(route, auth, formBuilder, router, toast) {
        this.route = route;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.password1 = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(6)
        ]);
        this.password2 = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(6)
        ]);
        this.passcode = new forms_1.FormControl('');
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var hasPasscode;
        var passcodeParam;
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.route.params.subscribe(function (params) {
            passcodeParam = params['passcode'];
        });
        hasPasscode = passcodeParam != undefined;
        if (hasPasscode) {
            this.passcode = new forms_1.FormControl(String(passcodeParam));
        }
        else {
            this.passcode = new forms_1.FormControl('');
        }
        this.resetPasswordForm = this.formBuilder.group({
            password1: this.password1,
            password2: this.password2,
            passcode: this.passcode
        });
    };
    ResetPasswordComponent.prototype.setClassPassword1 = function () {
        return { 'has-danger': !this.password1.pristine && !this.password1.valid };
    };
    ResetPasswordComponent.prototype.setClassPassword2 = function () {
        return { 'has-danger': !this.password2.pristine && !this.password2.valid };
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.auth.resetpassword(this.resetPasswordForm.value).subscribe(function (res) {
            var user = res.user;
        }, function (error) {
            _this.toast.setMessage('Failed to reset password!', 'danger');
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './resetpassword.component.html',
            styleUrls: ['./resetpassword.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            index_1.AuthService,
            forms_1.FormBuilder,
            router_1.Router,
            toast_component_1.ToastComponent])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=resetpassword.component.js.map
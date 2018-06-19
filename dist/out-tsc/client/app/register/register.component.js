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
//https://www.npmjs.com/package/ng-recaptcha
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var index_1 = require("../services/index");
var toast_component_1 = require("../shared/toast/toast.component");
var _ = require("lodash");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, toast, userService) {
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.form = new forms_1.FormGroup({});
        this.model = {};
        this.options = {};
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fields = [
            {
                key: 'firstname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Firstname',
                    placeholder: 'Firstname',
                    required: true
                }
            },
            {
                key: 'lastname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Lastname',
                    placeholder: 'Lastname',
                    required: true
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'repeatemail',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Repeat email address',
                    placeholder: 'Re-enter email',
                    required: true
                },
                validators: {
                    fieldMatch: {
                        expression: function (control) { return control.value === _this.model.email; },
                        message: 'Email address Not Matching'
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function () { return !_this.form.get('email').valid; }
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter password',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'repeatpassword',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Repeat password',
                    placeholder: 'Repeat password',
                    required: true
                },
                validators: {
                    fieldMatch: {
                        expression: function (control) { return control.value === _this.model.password; },
                        message: 'Password Not Matching'
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function () { return !_this.form.get('password').valid; }
                }
            },
            {
                key: 'phone',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Phone number',
                    placeholder: 'Phone number',
                    required: true
                }
            }
        ];
    };
    RegisterComponent.prototype.resolvedRecaptcha = function (captchaResponse) {
        console.log("Resolved captcha with response " + captchaResponse + ":");
        this.captchaResponse = captchaResponse;
    };
    RegisterComponent.prototype.register = function (user) {
        var _this = this;
        if (_.isNil(this.captchaResponse) || this.captchaResponse.length === 0) {
            this.toast.setMessage('Recaptcha is required.', 'danger');
            return;
        }
        if (user.email !== user.repeatemail) {
            this.toast.setMessage('Emails do not match', 'danger');
            return;
        }
        else if (user.password !== user.repeatpassword) {
            this.toast.setMessage('Passwords do not match', 'danger');
            return;
        }
        user.captcha = this.captchaResponse;
        this.userService.register(user).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address already exists', 'danger');
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            toast_component_1.ToastComponent,
            index_1.UserService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
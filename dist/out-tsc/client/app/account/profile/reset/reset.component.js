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
var index_1 = require("../../../services/index");
var toast_component_1 = require("../../../shared/toast/toast.component");
var ResetComponent = /** @class */ (function () {
    function ResetComponent(formBuilder, router, toast, userService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.showDivreset = true;
        this.email = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email
        ]);
        this.passcode = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(6)
        ]);
        this.password1 = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(6)
        ]);
        this.password2 = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(6)
        ]);
    }
    ResetComponent.prototype.ngOnInit = function () {
        this.passwordForm = this.formBuilder.group({
            email: this.email,
            passcode: this.passcode,
            password1: this.password1,
            password2: this.password2
        });
    };
    ResetComponent.prototype.onCancel = function () {
        this.router.navigate(['/login']);
    };
    ResetComponent.prototype.onLogin = function () {
        this.router.navigate(['/login']);
    };
    ResetComponent.prototype.onReset = function () {
        this.router.navigate(['/reset']);
    };
    ResetComponent.prototype.onResetSubmit = function () {
        var _this = this;
        this.userService.resetpassword(this.passwordForm.value).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            // this.hideShowDiv = true;
            _this.showDivreset = false;
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address does not exists', 'danger');
                _this.showDivreset = true;
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                _this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
                // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
                _this.showDivreset = true;
            }
        }
        // error => console.log('An Error Occurred: ' + error),
        // () => this.toast.setMessage('email already exists', 'danger')
        // error => this.toast.setMessage('email already exists', 'danger')
        );
    };
    ResetComponent.prototype.setClassEmail1 = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    ResetComponent.prototype.setClassPasscode = function () {
        return { 'has-danger': !this.passcode.pristine && !this.passcode.valid };
    };
    ResetComponent.prototype.setClassPassword1 = function () {
        return { 'has-danger': !this.password1.pristine && !this.password1.valid };
    };
    ResetComponent.prototype.setClassPassword2 = function () {
        return { 'has-danger': !this.password2.pristine && !this.password2.valid };
    };
    ResetComponent = __decorate([
        core_1.Component({
            selector: 'app-reset',
            templateUrl: './reset.component.html',
            styleUrls: ['./reset.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            toast_component_1.ToastComponent,
            index_1.UserService])
    ], ResetComponent);
    return ResetComponent;
}());
exports.ResetComponent = ResetComponent;
//# sourceMappingURL=reset.component.js.map
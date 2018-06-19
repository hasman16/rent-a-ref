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
var PasswordresetComponent = /** @class */ (function () {
    function PasswordresetComponent(formBuilder, router, toast, userService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.divMessage = '';
        this.hideShowDiv = false;
        this.email = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email
        ]);
    }
    PasswordresetComponent.prototype.ngOnInit = function () {
        this.emailForm = this.formBuilder.group({
            email: this.email
        });
    };
    PasswordresetComponent.prototype.onCancel = function () {
        this.router.navigate(['/login']);
    };
    PasswordresetComponent.prototype.onLogin = function () {
        this.router.navigate(['/login']);
    };
    PasswordresetComponent.prototype.onReset = function () {
        this.router.navigate(['/reset']);
    };
    PasswordresetComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userService.forgotpassword(this.emailForm.value).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            _this.divMessage = res.message;
            _this.hideShowDiv = true;
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address does not exists', 'danger');
                _this.hideShowDiv = false;
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                _this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
                _this.hideShowDiv = false;
            }
        });
    };
    PasswordresetComponent.prototype.setClassEmail = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    PasswordresetComponent = __decorate([
        core_1.Component({
            selector: 'app-passwordreset',
            templateUrl: './passwordreset.component.html',
            styleUrls: ['./passwordreset.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            toast_component_1.ToastComponent,
            index_1.UserService])
    ], PasswordresetComponent);
    return PasswordresetComponent;
}());
exports.PasswordresetComponent = PasswordresetComponent;
//# sourceMappingURL=passwordreset.component.js.map
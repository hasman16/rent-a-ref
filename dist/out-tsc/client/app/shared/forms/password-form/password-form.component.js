"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var forms_1 = require("@angular/forms");
var abstract_form_1 = require("../abstract-form");
var compareFields_1 = require("../../compareFields");
var index_1 = require("../../../services/index");
var PasswordFormComponent = /** @class */ (function (_super) {
    __extends(PasswordFormComponent, _super);
    function PasswordFormComponent(formBuilder, userService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.userService = userService;
        _this.showDivreset = true;
        _this.password1Invalid = false;
        _this.password2Invalid = false;
        _this.savePassword = new core_1.EventEmitter();
        _this.passwordForm = _this.formBuilder.group({
            password1: [
                '',
                [forms_1.Validators.required, forms_1.Validators.minLength(6)]
            ],
            password2: [
                '',
                [forms_1.Validators.required, forms_1.Validators.minLength(6)]
            ]
        }, { validator: compareFields_1.compareFields('password1', 'password2') });
        _this.setUpValidators(_this.passwordForm, ['password1', 'password2']);
        return _this;
    }
    PasswordFormComponent.prototype.onPasswordSubmit = function () {
        var _this = this;
        this.userService
            .changepassword(this.passwordForm.value, this.user.id)
            .subscribe(function () {
            _this.savePassword.emit({ action: 'save_success' });
        }, function (err) {
            _this.savePassword.emit({ action: 'save_failure' });
        });
    };
    PasswordFormComponent.prototype.fillForm = function () {
        this.passwordForm.setValue({
            password1: '',
            password2: ''
        });
    };
    PasswordFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PasswordFormComponent.prototype, "savePassword", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PasswordFormComponent.prototype, "user", void 0);
    PasswordFormComponent = __decorate([
        core_1.Component({
            selector: 'password-form',
            templateUrl: './password-form.component.html',
            styleUrls: ['./password-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.UserService])
    ], PasswordFormComponent);
    return PasswordFormComponent;
}(abstract_form_1.AbstractFormComponent));
exports.PasswordFormComponent = PasswordFormComponent;
//# sourceMappingURL=password-form.component.js.map
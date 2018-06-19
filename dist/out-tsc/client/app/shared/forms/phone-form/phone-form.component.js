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
var _ = require("lodash");
var PhoneFormComponent = /** @class */ (function (_super) {
    __extends(PhoneFormComponent, _super);
    function PhoneFormComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.savePhone = new core_1.EventEmitter();
        _this.numberInvalid = false;
        _this.descriptionInvalid = false;
        _this.phoneForm = _this.formBuilder.group({
            number: [
                '',
                [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(20)]
            ],
            description: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(10),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ]
        });
        _this.setUpValidators(_this.phoneForm, ['number', 'description']);
        return _this;
    }
    Object.defineProperty(PhoneFormComponent.prototype, "phone", {
        set: function (aPhone) {
            this.telephone = aPhone;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    PhoneFormComponent.prototype.fillForm = function () {
        this.phoneForm.setValue({
            number: this.telephone.number || '',
            description: this.telephone.description || ''
        });
    };
    PhoneFormComponent.prototype.onPhoneSubmit = function () {
        var _this = this;
        if (this.phoneService) {
            var newPhone = this.phoneForm.value;
            var observable = void 0;
            newPhone.id = this.telephone.id;
            this.savePhone.emit({ action: 'show_overlay' });
            if (_.isNil(newPhone.id) || parseInt(newPhone.id) === 0) {
                observable = this.phoneService.createPhone(newPhone);
            }
            else {
                observable = this.phoneService.updatePhone(newPhone);
            }
            observable.subscribe(function () {
                _this.savePhone.emit({ action: 'save_success' });
            }, function (err) {
                _this.savePhone.emit({ action: 'save_failure' });
            });
        }
    };
    PhoneFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PhoneFormComponent.prototype, "savePhone", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PhoneFormComponent.prototype, "phone", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PhoneFormComponent.prototype, "phoneService", void 0);
    PhoneFormComponent = __decorate([
        core_1.Component({
            selector: 'phone-form',
            templateUrl: './phone-form.component.html',
            styleUrls: ['./phone-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], PhoneFormComponent);
    return PhoneFormComponent;
}(abstract_form_1.AbstractFormComponent));
exports.PhoneFormComponent = PhoneFormComponent;
//# sourceMappingURL=phone-form.component.js.map
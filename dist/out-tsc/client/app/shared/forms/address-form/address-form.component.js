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
var index_1 = require("../../../services/index");
var abstract_form_1 = require("../abstract-form");
require("rxjs/add/operator/debounceTime");
var _ = require("lodash");
var AddressFormComponent = /** @class */ (function (_super) {
    __extends(AddressFormComponent, _super);
    function AddressFormComponent(formBuilder, statesService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.statesService = statesService;
        _this.anAddress = {};
        _this.countryName = 'usa';
        _this.mode = false;
        _this.line1Invalid = false;
        _this.cityInvalid = false;
        _this.zipInvalid = false;
        _this.userId = 0;
        _this.saveAddress = new core_1.EventEmitter();
        _this.addressForm = _this.formBuilder.group({
            line1: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(100),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ],
            line2: [
                '',
                [forms_1.Validators.maxLength(100), forms_1.Validators.pattern(_this.alphaNumericRegex)]
            ],
            city: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(30),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ],
            state: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(10),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ],
            zip: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(10),
                    forms_1.Validators.pattern(_this.zipRegex)
                ]
            ]
        });
        _this.setUpValidators(_this.addressForm, ['line1', 'city', 'zip']);
        return _this;
    }
    Object.defineProperty(AddressFormComponent.prototype, "address", {
        set: function (anAddress) {
            this.anAddress = _.cloneDeep(anAddress);
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressFormComponent.prototype, "zoneMode", {
        set: function (mode) {
            this.mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressFormComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    AddressFormComponent.prototype.fillForm = function () {
        this.states = this.statesService.getStatesProvinces(this.countryName);
        this.addressForm.setValue({
            line1: this.anAddress.line1 || '',
            line2: this.anAddress.line2 || '',
            city: this.anAddress.city || '',
            state: this.anAddress.state || '',
            zip: this.anAddress.zip || ''
        });
    };
    AddressFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    AddressFormComponent.prototype.onAddressSubmit = function () {
        var _this = this;
        if (this.addressService) {
            var newAddress = this.addressForm.value;
            var observable = void 0;
            newAddress.id = this.anAddress.id;
            this.saveAddress.emit({ action: 'show_overlay' });
            if (_.isNil(newAddress.id) || parseInt(newAddress.id) === 0) {
                observable = this.addressService.createAddress(newAddress);
            }
            else {
                observable = this.addressService.updateAddress(newAddress);
            }
            observable.subscribe(function () {
                _this.saveAddress.emit({ action: 'save_success' });
            }, function (err) {
                _this.saveAddress.emit({ action: 'save_failure' });
            });
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddressFormComponent.prototype, "saveAddress", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AddressFormComponent.prototype, "address", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AddressFormComponent.prototype, "zoneMode", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AddressFormComponent.prototype, "country", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddressFormComponent.prototype, "addressService", void 0);
    AddressFormComponent = __decorate([
        core_1.Component({
            selector: 'address-form',
            templateUrl: './address-form.component.html',
            styleUrls: ['./address-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.StatesService])
    ], AddressFormComponent);
    return AddressFormComponent;
}(abstract_form_1.AbstractFormComponent));
exports.AddressFormComponent = AddressFormComponent;
//# sourceMappingURL=address-form.component.js.map
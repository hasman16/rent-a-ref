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
var ZoneFormComponent = /** @class */ (function (_super) {
    __extends(ZoneFormComponent, _super);
    function ZoneFormComponent(formBuilder, statesService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.statesService = statesService;
        _this.countryName = 'usa';
        _this.radiusInvalid = false;
        _this.cityInvalid = false;
        _this.zipInvalid = false;
        _this.saveZone = new core_1.EventEmitter();
        _this.zoneForm = _this.formBuilder.group({
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
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(20),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ],
            zip: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(12),
                    forms_1.Validators.pattern(_this.zipRegex)
                ]
            ],
            radius: [
                '5',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(1),
                    forms_1.Validators.maxLength(3),
                    forms_1.Validators.pattern('\\d{1,3}')
                ]
            ]
        });
        _this.setUpValidators(_this.zoneForm, ['city', 'zip', 'radius']);
        return _this;
    }
    Object.defineProperty(ZoneFormComponent.prototype, "zone", {
        set: function (aZone) {
            this.aZone = aZone;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    ZoneFormComponent.prototype.country = function (aCountry) {
        if (aCountry === void 0) { aCountry = 'usa'; }
        this.countryName = aCountry;
        this.fillForm();
    };
    ZoneFormComponent.prototype.fillForm = function () {
        this.states = this.statesService.getStatesProvinces(this.countryName);
        this.zoneForm.setValue({
            city: this.aZone.city,
            state: this.aZone.state,
            zip: this.aZone.zip,
            radius: this.aZone.radius || 5
        });
    };
    ZoneFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    ZoneFormComponent.prototype.onZoneSubmit = function () {
        this.saveZone.emit(this.zoneForm.value);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ZoneFormComponent.prototype, "saveZone", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ZoneFormComponent.prototype, "zone", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ZoneFormComponent.prototype, "country", null);
    ZoneFormComponent = __decorate([
        core_1.Component({
            selector: 'zone-form',
            templateUrl: './zone-form.component.html',
            styleUrls: ['./zone-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.StatesService])
    ], ZoneFormComponent);
    return ZoneFormComponent;
}(abstract_form_1.AbstractFormComponent));
exports.ZoneFormComponent = ZoneFormComponent;
//# sourceMappingURL=zone-form.component.js.map
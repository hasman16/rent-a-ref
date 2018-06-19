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
var AbstractFormComponent = /** @class */ (function () {
    function AbstractFormComponent() {
        this.cancelForm = new core_1.EventEmitter();
    }
    AbstractFormComponent.prototype.setUpValidators = function (aForm, controls) {
        var _this = this;
        this.currentForm = aForm;
        controls.forEach(function (controlName) {
            var control = _this.currentForm.get(controlName);
            _this.validator(control, controlName + 'Invalid');
        });
    };
    AbstractFormComponent.prototype.validator = function (item, name) {
        var _this = this;
        item.valueChanges.debounceTime(1000).subscribe(function (value) {
            var result = false;
            if (item.touched && item.invalid) {
                result = true;
            }
            _this[name] = result;
        });
    };
    AbstractFormComponent.prototype.onCancel = function (event) {
        this.cancelForm.emit(false);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AbstractFormComponent.prototype, "cancelForm", void 0);
    return AbstractFormComponent;
}());
exports.AbstractFormComponent = AbstractFormComponent;
//# sourceMappingURL=abstract-form.js.map
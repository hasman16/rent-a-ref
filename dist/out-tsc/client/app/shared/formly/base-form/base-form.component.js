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
var forms_1 = require("@angular/forms");
var BaseFormComponent = /** @class */ (function () {
    function BaseFormComponent() {
        this.submitter = new core_1.EventEmitter();
        this.form = new forms_1.FormGroup({});
        this.model = {};
        this.options = {};
    }
    Object.defineProperty(BaseFormComponent.prototype, "Model", {
        set: function (model) {
            this.model = model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormComponent.prototype, "Fields", {
        set: function (fields) {
            this.fields = fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormComponent.prototype, "Options", {
        set: function (options) {
            this.options = options;
        },
        enumerable: true,
        configurable: true
    });
    BaseFormComponent.prototype.ngOnInit = function () { };
    BaseFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    __decorate([
        core_1.Input('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BaseFormComponent.prototype, "Model", null);
    __decorate([
        core_1.Input('fields'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], BaseFormComponent.prototype, "Fields", null);
    __decorate([
        core_1.Input('options'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BaseFormComponent.prototype, "Options", null);
    __decorate([
        core_1.Output('ngSubmit'),
        __metadata("design:type", core_1.EventEmitter)
    ], BaseFormComponent.prototype, "submitter", void 0);
    BaseFormComponent = __decorate([
        core_1.Component({
            selector: 'base-form',
            templateUrl: './base-form.component.html',
            styleUrls: ['./base-form.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BaseFormComponent);
    return BaseFormComponent;
}());
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=base-form.component.js.map
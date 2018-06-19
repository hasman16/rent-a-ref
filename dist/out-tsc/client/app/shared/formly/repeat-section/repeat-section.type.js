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
var core_2 = require("@ngx-formly/core");
var _ = require("lodash");
var RepeatTypeComponent = /** @class */ (function (_super) {
    __extends(RepeatTypeComponent, _super);
    function RepeatTypeComponent(builder) {
        var _this = _super.call(this) || this;
        _this.builder = builder;
        _this.fields = [];
        return _this;
    }
    Object.defineProperty(RepeatTypeComponent.prototype, "newFields", {
        get: function () {
            return _.cloneDeep(this.field.fieldArray.fieldGroup);
        },
        enumerable: true,
        configurable: true
    });
    RepeatTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.model) {
            setTimeout(function () { return _this.model.map(function () { return _this.add(); }); });
        }
    };
    RepeatTypeComponent.prototype.add = function () {
        var form = new forms_1.FormGroup({}), i = this.fields.length;
        if (!this.model[i]) {
            this.model.push({});
        }
        this.fields.push(this.newFields);
        this.builder.buildForm(form, this.fields[i], this.model[i], this.options);
        this.formControl.push(form);
    };
    RepeatTypeComponent.prototype.remove = function (i) {
        this.formControl.removeAt(i);
        this.model.splice(i, 1);
        this.fields.splice(i, 1);
    };
    RepeatTypeComponent = __decorate([
        core_1.Component({
            selector: 'formly-repeat-section',
            templateUrl: './repeat-section.type.html',
            styleUrls: ['./repeat-section.type.scss']
        }),
        __metadata("design:paramtypes", [core_2.FormlyFormBuilder])
    ], RepeatTypeComponent);
    return RepeatTypeComponent;
}(core_2.FieldType));
exports.RepeatTypeComponent = RepeatTypeComponent;
//# sourceMappingURL=repeat-section.type.js.map
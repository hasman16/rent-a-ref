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
var base_form_component_1 = require("./../../formly/base-form/base-form.component");
var _ = require("lodash");
var MatchesFormComponent = /** @class */ (function () {
    function MatchesFormComponent() {
        this.submitter = new core_1.EventEmitter();
        this.cancelSubmitter = new core_1.EventEmitter();
        this.model = {};
        this.disable = true;
        this.submitText = this.getSubmitText(false);
        this.disable = true;
    }
    Object.defineProperty(MatchesFormComponent.prototype, "aModel", {
        set: function (model) {
            this.submitText = this.getSubmitText(this.modelHasId(model));
            this.model = _.cloneDeep(model);
        },
        enumerable: true,
        configurable: true
    });
    MatchesFormComponent.prototype.modelHasId = function (model) {
        return _.has(model, 'id') && Number(model.id) > 0;
    };
    MatchesFormComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Update' : 'Create';
    };
    MatchesFormComponent.prototype.ngOnInit = function () {
        this.fields = [
            {
                template: '<div><strong>Match Information</strong></div>'
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'match_name',
                        templateOptions: {
                            label: 'Match Name',
                            required: true,
                            minLength: 5,
                            pattern: /\w+[a-zA-Z0-9]/
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'duration',
                        templateOptions: {
                            label: 'Duration',
                            type: 'number',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'periods',
                        templateOptions: {
                            label: 'Number ofPeriods',
                            type: 'number',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'referees',
                        templateOptions: {
                            label: 'Number of Referees',
                            type: 'number',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'date',
                        templateOptions: {
                            label: 'Match Date',
                            type: 'date',
                            required: true
                        }
                    }
                ]
            }
        ];
    };
    MatchesFormComponent.prototype.ngAfterViewInit = function () {
        this.disable = false;
    };
    MatchesFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    MatchesFormComponent.prototype.onCancel = function (event) {
        this.cancelSubmitter.emit(true);
    };
    __decorate([
        core_1.ViewChild(base_form_component_1.BaseFormComponent),
        __metadata("design:type", base_form_component_1.BaseFormComponent)
    ], MatchesFormComponent.prototype, "baseForm", void 0);
    __decorate([
        core_1.Input('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MatchesFormComponent.prototype, "aModel", null);
    __decorate([
        core_1.Output('ngSubmit'),
        __metadata("design:type", core_1.EventEmitter)
    ], MatchesFormComponent.prototype, "submitter", void 0);
    __decorate([
        core_1.Output('ngCancel'),
        __metadata("design:type", core_1.EventEmitter)
    ], MatchesFormComponent.prototype, "cancelSubmitter", void 0);
    MatchesFormComponent = __decorate([
        core_1.Component({
            selector: 'matches-form',
            templateUrl: './matches-form.component.html',
            styleUrls: ['./matches-form.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MatchesFormComponent);
    return MatchesFormComponent;
}());
exports.MatchesFormComponent = MatchesFormComponent;
//# sourceMappingURL=matches-form.component.js.map
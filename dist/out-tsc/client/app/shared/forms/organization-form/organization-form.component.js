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
var index_1 = require("./../../../services/index");
var base_form_component_1 = require("./../../formly/base-form/base-form.component");
var _ = require("lodash");
var OrganizationFormComponent = /** @class */ (function () {
    function OrganizationFormComponent(statesService) {
        this.statesService = statesService;
        this.submitter = new core_1.EventEmitter();
        this.cancelSubmitter = new core_1.EventEmitter();
        this.model = {};
        this.disable = true;
        this.submitText = this.getSubmitText(false);
        this.disable = true;
    }
    Object.defineProperty(OrganizationFormComponent.prototype, "aModel", {
        set: function (model) {
            var hasId = this.modelHasId(model);
            this.submitText = this.getSubmitText(hasId);
            this.model = _.cloneDeep(model);
        },
        enumerable: true,
        configurable: true
    });
    OrganizationFormComponent.prototype.modelHasId = function (model) {
        return _.has(model, 'id') && Number(model.id) > 0;
    };
    OrganizationFormComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Update' : 'Create';
    };
    OrganizationFormComponent.prototype.ngOnInit = function () {
        this.states = this.statesService.getStatesProvinces();
        this.fields = [
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'name',
                        templateOptions: {
                            label: 'Organization Name',
                            required: true,
                            minLength: 5,
                            pattern: /\w+[a-zA-Z0-9]/
                        }
                    }
                ]
            },
            {
                template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
            },
            {
                key: 'addresses',
                type: 'repeat',
                fieldArray: {
                    fieldGroupClassName: 'row',
                    templateOptions: {
                        btnText: 'Add Address'
                    },
                    fieldGroup: [
                        {
                            className: 'col-sm-3',
                            type: 'input',
                            key: 'line1',
                            templateOptions: {
                                label: 'Street 1',
                                required: true
                            }
                        },
                        {
                            type: 'input',
                            key: 'line2',
                            className: 'col-sm-3',
                            templateOptions: {
                                type: 'text',
                                label: 'Street 2'
                            }
                        },
                        {
                            type: 'input',
                            key: 'city',
                            className: 'col-sm-2',
                            templateOptions: {
                                label: 'City',
                                required: true
                            }
                        },
                        {
                            type: 'select',
                            key: 'state',
                            className: 'col-sm-2',
                            templateOptions: {
                                label: 'State',
                                options: _.cloneDeep(this.states),
                                required: true
                            }
                        },
                        {
                            type: 'input',
                            key: 'zip',
                            className: 'col-sm-2',
                            templateOptions: {
                                label: 'Zip',
                                required: true,
                                pattern: /\d{5}(\-\d{4})?/
                            }
                        },
                        {
                            type: 'input',
                            key: 'country',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Country'
                            }
                        }
                    ]
                }
            },
            {
                template: '<hr class="space-hr" /><div><strong>Phones</strong></div>'
            },
            {
                key: 'phones',
                type: 'repeat',
                fieldArray: {
                    fieldGroupClassName: 'row',
                    templateOptions: {
                        btnText: 'Add Phone'
                    },
                    fieldGroup: [
                        {
                            className: 'col-sm-6',
                            type: 'select',
                            key: 'description',
                            templateOptions: {
                                label: 'Type',
                                required: true,
                                options: [
                                    { label: 'Mobile', value: 'mobile' },
                                    { label: 'Home', value: 'home' },
                                    { label: 'Work', value: 'work' },
                                    { label: 'Other', value: 'other' }
                                ]
                            }
                        },
                        {
                            type: 'input',
                            key: 'number',
                            className: 'col-sm-6',
                            templateOptions: {
                                type: 'text',
                                label: 'Number',
                                pattern: /(\d{3}-\d{3}-\d{4}|\d{10,})/,
                                required: true
                            }
                        }
                    ]
                }
            }
        ];
    };
    OrganizationFormComponent.prototype.ngAfterViewInit = function () {
        this.disable = false;
    };
    OrganizationFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    OrganizationFormComponent.prototype.onCancel = function (event) {
        this.cancelSubmitter.emit(true);
    };
    __decorate([
        core_1.ViewChild(base_form_component_1.BaseFormComponent),
        __metadata("design:type", base_form_component_1.BaseFormComponent)
    ], OrganizationFormComponent.prototype, "baseForm", void 0);
    __decorate([
        core_1.Input('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OrganizationFormComponent.prototype, "aModel", null);
    __decorate([
        core_1.Output('ngSubmit'),
        __metadata("design:type", core_1.EventEmitter)
    ], OrganizationFormComponent.prototype, "submitter", void 0);
    __decorate([
        core_1.Output('ngCancel'),
        __metadata("design:type", core_1.EventEmitter)
    ], OrganizationFormComponent.prototype, "cancelSubmitter", void 0);
    OrganizationFormComponent = __decorate([
        core_1.Component({
            selector: 'organization-form',
            templateUrl: './organization-form.component.html',
            styleUrls: ['./organization-form.component.scss']
        }),
        __metadata("design:paramtypes", [index_1.StatesService])
    ], OrganizationFormComponent);
    return OrganizationFormComponent;
}());
exports.OrganizationFormComponent = OrganizationFormComponent;
//# sourceMappingURL=organization-form.component.js.map
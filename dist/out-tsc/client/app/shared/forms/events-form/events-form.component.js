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
var EventsFormComponent = /** @class */ (function () {
    function EventsFormComponent() {
        this.submitter = new core_1.EventEmitter();
        this.cancelSubmitter = new core_1.EventEmitter();
        this.model = {};
        this.disable = true;
        this.submitText = this.getSubmitText(false);
        this.disable = true;
    }
    Object.defineProperty(EventsFormComponent.prototype, "aModel", {
        set: function (model) {
            this.submitText = this.getSubmitText(this.modelHasId(model));
            this.model = _.cloneDeep(model);
        },
        enumerable: true,
        configurable: true
    });
    EventsFormComponent.prototype.modelHasId = function (model) {
        return _.has(model, 'id') && Number(model.id) > 0;
    };
    EventsFormComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Update' : 'Create';
    };
    EventsFormComponent.prototype.ngOnInit = function () {
        this.fields = [
            {
                template: '<div><strong>Event Information</strong></div>'
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'event_name',
                        templateOptions: {
                            label: 'Event Name',
                            required: true,
                            minLength: 5,
                            pattern: /\w+[a-zA-Z0-9]/
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'event_date',
                        templateOptions: {
                            label: 'Event Date',
                            type: 'date',
                            required: true
                        }
                    }
                ]
            },
            {
                template: '<hr class="space-hr" />'
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'select',
                        key: 'sport_id',
                        templateOptions: {
                            label: 'Type of Sport',
                            required: true,
                            options: _.cloneDeep(this.sports)
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'radio',
                        key: 'event_type',
                        templateOptions: {
                            label: 'What type of event',
                            required: true,
                            options: [
                                { value: 'League', key: 'league' },
                                { value: 'Tournament', key: 'tournament' },
                                { value: 'One off event', key: 'oneoff' }
                            ]
                        }
                    }
                ]
            },
            {
                template: '<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-4',
                        type: 'checkbox',
                        key: 'kids',
                        templateOptions: {
                            label: 'Kids 13 and Under',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-4',
                        type: 'checkbox',
                        key: 'teens',
                        templateOptions: {
                            label: 'High School',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-4',
                        type: 'checkbox',
                        key: 'adults',
                        templateOptions: {
                            label: 'Over 18',
                            required: true
                        }
                    }
                ]
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'kids_games',
                        templateOptions: {
                            label: 'Number games for Kids 13 and Under.',
                            type: 'number',
                            min: 1,
                            max: 1000
                        },
                        expressionProperties: {
                            'templateOptions.required': 'model.kids',
                            'templateOptions.disabled': '!model.kids'
                        }
                    },
                    {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'teen_games',
                        templateOptions: {
                            label: 'Number of games for High Schooler.',
                            type: 'number',
                            min: 1,
                            max: 1000,
                            required: true
                        },
                        expressionProperties: {
                            'templateOptions.required': 'model.teens',
                            'templateOptions.disabled': '!model.teens'
                        }
                    },
                    {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'adult_games',
                        templateOptions: {
                            label: 'Number of games for Over 18s.',
                            type: 'number',
                            min: 1,
                            max: 1000,
                            required: true
                        },
                        expressionProperties: {
                            'templateOptions.required': 'model.adults',
                            'templateOptions.disabled': '!model.adults'
                        }
                    }
                ]
            },
            {
                template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'venue_name',
                        templateOptions: {
                            label: 'Venue Name',
                            required: true,
                            minLength: 5,
                            pattern: /\w+[a-zA-Z0-9]/
                        }
                    },
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
                    }
                ]
            }
        ];
    };
    EventsFormComponent.prototype.ngAfterViewInit = function () {
        this.disable = false;
    };
    EventsFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    EventsFormComponent.prototype.onCancel = function (event) {
        this.cancelSubmitter.emit(true);
    };
    __decorate([
        core_1.ViewChild(base_form_component_1.BaseFormComponent),
        __metadata("design:type", base_form_component_1.BaseFormComponent)
    ], EventsFormComponent.prototype, "baseForm", void 0);
    __decorate([
        core_1.Input('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], EventsFormComponent.prototype, "aModel", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EventsFormComponent.prototype, "states", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EventsFormComponent.prototype, "sports", void 0);
    __decorate([
        core_1.Output('ngSubmit'),
        __metadata("design:type", core_1.EventEmitter)
    ], EventsFormComponent.prototype, "submitter", void 0);
    __decorate([
        core_1.Output('ngCancel'),
        __metadata("design:type", core_1.EventEmitter)
    ], EventsFormComponent.prototype, "cancelSubmitter", void 0);
    EventsFormComponent = __decorate([
        core_1.Component({
            selector: 'events-form',
            templateUrl: './events-form.component.html',
            styleUrls: ['./events-form.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], EventsFormComponent);
    return EventsFormComponent;
}());
exports.EventsFormComponent = EventsFormComponent;
//# sourceMappingURL=events-form.component.js.map
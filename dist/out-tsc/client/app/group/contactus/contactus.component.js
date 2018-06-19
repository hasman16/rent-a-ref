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
var toast_component_1 = require("../../shared/toast/toast.component");
require("rxjs/add/operator/take");
var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(toast) {
        this.toast = toast;
        this.form = new forms_1.FormGroup({});
        this.model = {};
        this.options = {};
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        this.fields = [
            {
                key: 'fullname',
                type: 'input',
                templateOptions: {
                    placeholder: 'Fullname',
                    label: 'Fullname',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    placeholder: 'Email Address',
                    label: 'Email',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'subject',
                type: 'input',
                templateOptions: {
                    placeholder: 'Subject',
                    label: 'Subject',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'comment',
                type: 'textarea',
                templateOptions: {
                    type: 'textarea',
                    placeholder: 'Comment',
                    label: 'Comment',
                    required: true,
                    minLength: 5
                }
            }
        ];
    };
    ContactUsComponent.prototype.onSubmit = function (model) { };
    ContactUsComponent = __decorate([
        core_1.Component({
            selector: 'app-contactus',
            templateUrl: './contactus.component.html',
            styleUrls: ['./contactus.component.scss']
        }),
        __metadata("design:paramtypes", [toast_component_1.ToastComponent])
    ], ContactUsComponent);
    return ContactUsComponent;
}());
exports.ContactUsComponent = ContactUsComponent;
//# sourceMappingURL=contactus.component.js.map
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
var index_1 = require("../../../services/index");
require("rxjs/add/operator/debounceTime");
var BioFormComponent = /** @class */ (function (_super) {
    __extends(BioFormComponent, _super);
    function BioFormComponent(formBuilder, userService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.userService = userService;
        _this.saveBio = new core_1.EventEmitter();
        _this.aPerson = {};
        _this.mode = false;
        _this.showDivbio = true;
        _this.firstnameInvalid = false;
        _this.lastnameInvalid = false;
        _this.myDatePickerOptions = {
            dateFormat: 'yyyy-mm-dd'
        };
        _this.bioForm = _this.formBuilder.group({
            firstname: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(30),
                    forms_1.Validators.pattern(_this.alphaNumericRegex)
                ]
            ],
            middlenames: [
                '',
                [forms_1.Validators.maxLength(30), forms_1.Validators.pattern(_this.alphaNumericRegex)]
            ],
            lastname: [
                '',
                [forms_1.Validators.maxLength(30), forms_1.Validators.pattern(_this.alphaNumericRegex)]
            ],
            gender: ['', [forms_1.Validators.nullValidator]],
            dob: [{ date: { year: 1998, month: 10, day: 9 } }, forms_1.Validators.required] // this example is initialized to specific date
        });
        _this.setUpValidators(_this.bioForm, ['firstname', 'lastname']);
        return _this;
    }
    Object.defineProperty(BioFormComponent.prototype, "person", {
        set: function (aPerson) {
            this.aPerson = aPerson;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    BioFormComponent.prototype.fillForm = function () {
        if (this.aPerson) {
            this.bioForm.setValue({
                firstname: this.aPerson.firstname,
                middlenames: this.aPerson.middlenames,
                lastname: this.aPerson.lastname,
                gender: this.aPerson.gender,
                dob: this.getDate(this.aPerson.dob)
            });
        }
    };
    BioFormComponent.prototype.getDate = function (timestamp) {
        var date = new Date(timestamp);
        return {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        };
    };
    BioFormComponent.prototype.setDate = function (timestamp) {
        if (timestamp) {
            // Set today using the setValue function
            this.bioForm.patchValue({ dob: this.getDate(timestamp) });
        }
        else {
            this.resetDate();
        }
    };
    BioFormComponent.prototype.resetDate = function () {
        // Reset date picker to specific date (today)
        this.bioForm.reset({ dob: { jsdate: new Date() } });
    };
    BioFormComponent.prototype.clearDate = function () {
        // Clear the date using the patchValue function (use null or empty string)
        this.bioForm.patchValue({ dob: null });
    };
    BioFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    BioFormComponent.prototype.getEpoc = function (dob) {
        var value = 0;
        if (dob.epoc) {
            value = Number(dob.epoc) * 1000;
        }
        else {
            var day = Number(dob.date.day);
            var month = Number(dob.date.month) - 1;
            var year = Number(dob.date.year);
            value = new Date(year, month, day).getTime();
        }
        return value;
    };
    BioFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var bio = this.bioForm.value;
        bio.dob = this.getEpoc(bio.dob);
        this.userService.updatePerson(bio, this.aPerson.id).subscribe(function () {
            _this.saveBio.emit({ action: 'save_success' });
        }, function (err) {
            _this.saveBio.emit({ action: 'save_failure' });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BioFormComponent.prototype, "person", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BioFormComponent.prototype, "saveBio", void 0);
    BioFormComponent = __decorate([
        core_1.Component({
            selector: 'bio-form',
            templateUrl: './bio-form.component.html',
            styleUrls: ['./bio-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.UserService])
    ], BioFormComponent);
    return BioFormComponent;
}(abstract_form_1.AbstractFormComponent));
exports.BioFormComponent = BioFormComponent;
//# sourceMappingURL=bio-form.component.js.map
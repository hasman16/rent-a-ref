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
var modal_component_1 = require("./../../shared/modal/modal.component");
var TermsModalComponent = /** @class */ (function () {
    function TermsModalComponent() {
        this.hideEmitter = new core_1.EventEmitter(false);
        this.title = 'Rend-A-Ref Terms and Conditions';
        this.submitText = 'Ok';
        this.visible = false;
    }
    Object.defineProperty(TermsModalComponent.prototype, "show", {
        set: function (value) {
            if (value) {
                this.termsModal.showModal(null);
            }
            else {
                this.termsModal.hideModal(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    TermsModalComponent.prototype.ngOnInit = function () { };
    TermsModalComponent.prototype.hide = function (event) {
        this.visible = false;
        this.hideEmitter.emit(false);
    };
    TermsModalComponent.prototype.closeModal = function ($event) {
        this.hide(null);
    };
    TermsModalComponent.prototype.submitModal = function ($event) {
        this.hide(null);
    };
    __decorate([
        core_1.ViewChild('terms'),
        __metadata("design:type", modal_component_1.ModalComponent)
    ], TermsModalComponent.prototype, "termsModal", void 0);
    __decorate([
        core_1.Input('show'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TermsModalComponent.prototype, "show", null);
    __decorate([
        core_1.Output('hide'),
        __metadata("design:type", core_1.EventEmitter)
    ], TermsModalComponent.prototype, "hideEmitter", void 0);
    TermsModalComponent = __decorate([
        core_1.Component({
            selector: 'terms-modal',
            templateUrl: './terms.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [])
    ], TermsModalComponent);
    return TermsModalComponent;
}());
exports.TermsModalComponent = TermsModalComponent;
//# sourceMappingURL=terms.component.js.map
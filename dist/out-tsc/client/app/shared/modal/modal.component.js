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
//embed.plnkr.co/AuFMJVHpk9OaLr62puS1
var core_1 = require("@angular/core");
var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.modalName = '';
        this.closable = true;
        this.visible = false;
        this.backText = '';
        this.cancelText = 'Cancel';
        this.disableSubmit = false;
        this.submitText = 'Submit';
        this.visibleChange = new core_1.EventEmitter();
        this.back = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this.subscription = [];
    }
    ModalComponent.prototype.ngOnInit = function () { };
    ModalComponent.prototype.ngOnDestroy = function () {
        this.subscription.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ModalComponent.prototype.backModal = function ($event) {
        this.back.emit(true);
    };
    ModalComponent.prototype.closeModal = function ($event) {
        this.cancel.emit(true);
        this.hideModal(null);
    };
    ModalComponent.prototype.submitModal = function ($event) {
        this.submit.emit(true);
    };
    ModalComponent.prototype.hideModal = function ($event) {
        this.updateVisibility(false);
    };
    ModalComponent.prototype.showModal = function ($event) {
        this.updateVisibility(true);
    };
    ModalComponent.prototype.updateVisibility = function (state) {
        this.visible = state;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        core_1.Input('name'),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "modalName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "backText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "disableSubmit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "submitText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "visibleChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "back", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "cancel", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'rar-modal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map
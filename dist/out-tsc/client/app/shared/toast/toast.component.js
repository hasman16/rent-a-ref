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
var toast_service_1 = require("./toast.service");
var ToastComponent = /** @class */ (function () {
    function ToastComponent(toastService) {
        this.toastService = toastService;
        this.message = { body: '', type: '' };
    }
    ToastComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toastService.toasts.subscribe(function (toast) {
            _this.setMessage(toast.body, toast.type);
        });
    };
    ToastComponent.prototype.ngOnDestroy = function () {
        if (this.toastSubscription) {
            this.toastSubscription.unsubscribe();
        }
    };
    ToastComponent.prototype.setMessage = function (body, type, time) {
        var _this = this;
        if (time === void 0) { time = 10000; }
        this.message.body = body;
        this.message.type = type;
        setTimeout(function () {
            _this.message.body = '';
        }, time);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ToastComponent.prototype, "message", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: 'app-toast',
            templateUrl: './toast.component.html',
            styleUrls: ['./toast.component.scss']
        }),
        __metadata("design:paramtypes", [toast_service_1.ToastService])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map
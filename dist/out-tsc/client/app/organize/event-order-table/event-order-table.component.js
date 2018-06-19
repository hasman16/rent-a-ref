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
var EventOrderTableComponent = /** @class */ (function () {
    function EventOrderTableComponent() {
    }
    EventOrderTableComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EventOrderTableComponent.prototype, "model", void 0);
    EventOrderTableComponent = __decorate([
        core_1.Component({
            selector: 'event-order-table',
            templateUrl: './event-order-table.component.html',
            styleUrls: ['./event-order-table.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], EventOrderTableComponent);
    return EventOrderTableComponent;
}());
exports.EventOrderTableComponent = EventOrderTableComponent;
//# sourceMappingURL=event-order-table.component.js.map
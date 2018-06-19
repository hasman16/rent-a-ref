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
var carousel_item_component_1 = require("./carousel-item/carousel-item.component");
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent() {
        this.delay = 0;
    }
    CarouselComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.activeItem = 0;
        var arrItems = this.items.toArray();
        var TOTAL_ITEMS = arrItems.length;
        setInterval(function () {
            arrItems.forEach(function (c, i) { return c.isActive = (i === _this.activeItem); });
            _this.activeItem = (_this.activeItem++) % TOTAL_ITEMS;
        }, this.delay);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CarouselComponent.prototype, "delay", void 0);
    __decorate([
        core_1.ContentChildren(carousel_item_component_1.CarouselItemComponent),
        __metadata("design:type", core_1.QueryList)
    ], CarouselComponent.prototype, "items", void 0);
    CarouselComponent = __decorate([
        core_1.Component({
            selector: 'app-carousel',
            templateUrl: './carousel.component.html'
        })
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
//# sourceMappingURL=carousel.component.js.map
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
// import { NgModule } from '@angular/core';
var DropdownDirective = /** @class */ (function () {
    function DropdownDirective() {
        // We use the HostBinding to attach the css element class.open
        // The HostListener listen to the CLICK even so the class.open can be applied to the html object
        // class.open allows the dropdown to open up and reveal its content
        this.isOpen = false;
    }
    DropdownDirective.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
    };
    __decorate([
        core_1.HostBinding('class.open'),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "isOpen", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "toggleOpen", null);
    DropdownDirective = __decorate([
        core_1.Directive({
            selector: '[appDropdown]'
        })
        // This appDropdown would be consumed by the recipe-detail.component.html and header.component.html.
        ,
        __metadata("design:paramtypes", [])
    ], DropdownDirective);
    return DropdownDirective;
}());
exports.DropdownDirective = DropdownDirective;
//# sourceMappingURL=dropdown.directive.js.map
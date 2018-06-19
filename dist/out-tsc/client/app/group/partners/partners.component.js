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
var PartnersComponent = /** @class */ (function () {
    function PartnersComponent() {
    }
    PartnersComponent.prototype.ngOnInit = function () { };
    PartnersComponent = __decorate([
        core_1.Component({
            selector: 'app-partners',
            templateUrl: './partners.component.html',
            styleUrls: ['./partners.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], PartnersComponent);
    return PartnersComponent;
}());
exports.PartnersComponent = PartnersComponent;
//# sourceMappingURL=partners.component.js.map
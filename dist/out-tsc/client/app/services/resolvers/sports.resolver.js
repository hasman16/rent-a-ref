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
var index_1 = require("./../http/index");
var SportsResolver = /** @class */ (function () {
    function SportsResolver(pagingService, organizeService) {
        this.pagingService = pagingService;
        this.organizeService = organizeService;
    }
    SportsResolver.prototype.resolve = function () {
        var pagingInfo = this.pagingService.getDefaultPager();
        return this.organizeService.getSports(pagingInfo);
    };
    SportsResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.PagingService,
            index_1.OrganizeService])
    ], SportsResolver);
    return SportsResolver;
}());
exports.SportsResolver = SportsResolver;
//# sourceMappingURL=sports.resolver.js.map
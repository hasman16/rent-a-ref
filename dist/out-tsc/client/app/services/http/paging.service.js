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
var _ = require("lodash");
var PagingService = /** @class */ (function () {
    function PagingService() {
        this.LIMIT = 10;
    }
    PagingService.prototype.getDefaultPager = function () {
        return {
            offset: 0,
            limit: this.LIMIT,
            total_elements: 0,
            total_pages: 0,
            sortby: '',
            order: '',
            search: ''
        };
    };
    PagingService.prototype.sortColumn = function (page, sorting) {
        var sort = sorting.sorts[0];
        var pager = _.cloneDeep(page);
        pager.order = sort.dir;
        pager.sortby = sort.prop;
        pager.offset = 0;
        return pager;
    };
    PagingService.prototype.processPagedData = function (page, data) {
        var newData = _.isArray(data.rows) ? _.cloneDeep(data.rows) : [];
        var pager = _.cloneDeep(page);
        pager.limit = Math.min(Math.max(pager.limit, 0), this.LIMIT);
        pager.total_elements = data.count || 0;
        pager.total_pages = Math.ceil(pager.total_elements / pager.limit);
        return [pager, newData];
    };
    PagingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PagingService);
    return PagingService;
}());
exports.PagingService = PagingService;
//# sourceMappingURL=paging.service.js.map
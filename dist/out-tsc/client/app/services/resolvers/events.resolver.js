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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
require("rxjs/add/observable/empty");
var EventsResolver = /** @class */ (function () {
    function EventsResolver(eventsService) {
        this.eventsService = eventsService;
    }
    EventsResolver.prototype.resolve = function (route) {
        var organization_id = route.paramMap.get('organization_id');
        return this.eventsService
            .getOrganizationGames(organization_id)
            .catch(function () {
            return Observable_1.Observable.empty();
        });
    };
    EventsResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.EventsService])
    ], EventsResolver);
    return EventsResolver;
}());
exports.EventsResolver = EventsResolver;
//# sourceMappingURL=events.resolver.js.map
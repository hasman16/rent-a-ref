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
var http_1 = require("@angular/common/http");
var EventsService = /** @class */ (function () {
    function EventsService(http) {
        this.http = http;
    }
    EventsService.prototype.getPrices = function () {
        return this.http.get("/api/prices");
    };
    EventsService.prototype.getAllGames = function (queryParams) {
        if (queryParams === void 0) { queryParams = null; }
        return this.http.get("/api/games", {
            params: queryParams
        });
    };
    EventsService.prototype.getGame = function (game_id) {
        return this.http.get("/api/games/" + game_id);
    };
    EventsService.prototype.getOrganizationGames = function (organization_id) {
        var url = "/api/organization/" + organization_id + "/games";
        return this.http.get(url);
    };
    EventsService.prototype.createGame = function (organization_id, game) {
        var url = "/api/organization/" + organization_id + "/games";
        return this.postData(url, game);
    };
    EventsService.prototype.updateGame = function (game) {
        var url = "/api/games/" + game.id;
        return this.putData(url, game);
    };
    EventsService.prototype.createAddress = function (game_id, address) {
        var url = "/api/games/" + game_id + "/addresses";
        return this.postData(url, address);
    };
    EventsService.prototype.updateAddress = function (game_id, address) {
        var url = "/api/games/" + game_id + "/addresses/" + address.id;
        return this.putData(url, address);
    };
    EventsService.prototype.createPhone = function (game_id, phone) {
        var url = "/api/games/" + game_id + "/phones";
        return this.postData(url, phone);
    };
    EventsService.prototype.updatePhone = function (game_id, phone) {
        var url = "/api/games/" + game_id + "/phones/" + phone.id;
        return this.putData(url, phone);
    };
    EventsService.prototype.postData = function (url, data) {
        return this.http.post(url, JSON.stringify(data));
    };
    EventsService.prototype.putData = function (url, data) {
        return this.http.put(url, JSON.stringify(data));
    };
    EventsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map
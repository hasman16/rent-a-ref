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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.user = {};
        this.userStream = new BehaviorSubject_1.BehaviorSubject(this.user);
    }
    UserService.prototype.register = function (user) {
        return this.http.post('/api/register', JSON.stringify(user));
    };
    UserService.prototype.login = function (credentials) {
        return this.http.post('/api/login', JSON.stringify(credentials));
    };
    UserService.prototype.getUsers = function (queryParams) {
        if (queryParams === void 0) { queryParams = null; }
        return this.http.get("/api/users", {
            params: queryParams
        });
    };
    UserService.prototype.getUser = function (user_id) {
        return this.http.get("/api/users/" + user_id);
    };
    UserService.prototype.resetpassword = function (credentials) {
        return this.http.post('/api/resetpassword', JSON.stringify(credentials));
    };
    UserService.prototype.forgotpassword = function (email) {
        return this.http.post('/api/forgotpassword', JSON.stringify(email));
    };
    UserService.prototype.changepassword = function (passwords, user_id) {
        return this.http.put("/api/changepassword/" + user_id, JSON.stringify(passwords));
    };
    UserService.prototype.editUser = function (user) {
        return this.http.put("/api/users/" + user.id, JSON.stringify(user));
    };
    UserService.prototype.deleteUser = function (user_id) {
        return this.http.delete("/api/users/" + user_id);
    };
    UserService.prototype.getProfile = function (user_id) {
        return this.http.get("/api/profile/" + user_id);
    };
    UserService.prototype.getPerson = function (person_id) {
        return this.http.get("/api/people/" + person_id);
    };
    UserService.prototype.updatePerson = function (information, person_id) {
        return this.http.put("/api/people/" + person_id, JSON.stringify(information));
    };
    //Zones
    UserService.prototype.createZone = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/location_preference", JSON.stringify(information));
    };
    UserService.prototype.updateZone = function (information, zone_id) {
        return this.http.put("/api/location_preference/" + zone_id, JSON.stringify(information));
    };
    //Payments
    UserService.prototype.updatePayment = function (information, user) {
        return this.http.put("/api/payment/" + user.id, JSON.stringify(information));
    };
    //addresses
    UserService.prototype.getUserAddresses = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/addresses");
    };
    UserService.prototype.getUserAddress = function (user_id, address_id) {
        return this.http.get("/api/users/" + user_id + "/addresses/" + address_id);
    };
    UserService.prototype.createAddress = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/addresses", JSON.stringify(information));
    };
    UserService.prototype.updateAddress = function (information, user_id, address_id) {
        return this.http.put("/api/users/" + user_id + "/addresses/" + address_id, JSON.stringify(information));
    };
    //Phones
    UserService.prototype.getUserPhones = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/phones");
    };
    UserService.prototype.getUserPhone = function (user_id, phone_id) {
        return this.http.get("/api/users/" + user_id + "/phones/" + phone_id);
    };
    UserService.prototype.createPhone = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/phones", JSON.stringify(information));
    };
    UserService.prototype.updatePhone = function (information, user_id, phone_id) {
        return this.http.put("/api/users/" + user_id + "/phones/" + phone_id, JSON.stringify(information));
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
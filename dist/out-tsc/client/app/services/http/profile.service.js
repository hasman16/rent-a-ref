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
var user_service_1 = require("./user.service");
var _ = require("lodash");
var ProfileService = /** @class */ (function () {
    function ProfileService(userService) {
        this.userService = userService;
        this.addresses = [];
        this.phones = [];
        this.areas = [];
    }
    ProfileService.prototype.getData = function () {
        return _.cloneDeep(this.data);
    };
    ProfileService.prototype.getPerson = function () {
        return _.cloneDeep(this.person);
    };
    ProfileService.prototype.getAddresses = function () {
        return _.cloneDeep(this.addresses);
    };
    ProfileService.prototype.getAreas = function () {
        return _.cloneDeep(this.areas);
    };
    ProfileService.prototype.getPhones = function () {
        return _.cloneDeep(this.phones);
    };
    ProfileService.prototype.getProfile = function (user_id) {
        var _this = this;
        return this.userService.getProfile(user_id).map(function (res) {
            _this.data = res;
            _this.person = res.person;
            _this.addresses = res.addresses;
            _this.phones = res.phones;
            _this.areas = res.areas;
            return res;
        });
    };
    ProfileService.prototype.createAddress = function (newAddress) {
        return this.userService.createAddress(newAddress, this.data.id);
    };
    ProfileService.prototype.updateAddress = function (newAddress) {
        return this.userService.updateAddress(newAddress, this.data.id, newAddress.id);
    };
    ProfileService.prototype.createPhone = function (newPhone) {
        return this.userService.createPhone(newPhone, this.data.id);
    };
    ProfileService.prototype.updatePhone = function (newPhone) {
        return this.userService.updatePhone(newPhone, this.data.id, newPhone.id);
    };
    ProfileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map
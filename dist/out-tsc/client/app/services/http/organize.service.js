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
require("rxjs/add/operator/do");
require("rxjs/add/operator/take");
var _ = require("lodash");
var OrganizeService = /** @class */ (function () {
    function OrganizeService(http) {
        this.http = http;
        this.addresses = [];
        this.phones = [];
        this.sportsData = {};
    }
    OrganizeService.prototype.getData = function () {
        return _.cloneDeep(this.data);
    };
    OrganizeService.prototype.getAddresses = function () {
        return _.cloneDeep(this.addresses);
    };
    OrganizeService.prototype.getPhones = function () {
        return _.cloneDeep(this.phones);
    };
    OrganizeService.prototype.getSports = function (queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = null; }
        var ob;
        if (!_.isArray(this.sportsData.rows) || this.sportsData.rows.length === 0) {
            ob = this.http
                .get("/api/sports", {
                params: queryParams
            })
                .do(function (sportsData) { return (_this.sportsData = _.cloneDeep(sportsData)); });
        }
        else {
            var bs = new BehaviorSubject_1.BehaviorSubject(null);
            bs.next(_.cloneDeep(this.sportsData));
            ob = bs;
        }
        return ob.take(1);
    };
    // addresses
    OrganizeService.prototype.getOrgAddresses = function (Organization_id) {
        return this.http.get("/api/organizations/" + Organization_id + "/addresses");
    };
    OrganizeService.prototype.getOrgAddress = function (org_id, add_id) {
        return this.http.get("/api/organizations/" + org_id + "/addresses/" + add_id);
    };
    // Phones
    OrganizeService.prototype.getOrgPhones = function (Organization_id) {
        return this.http.get("/api/organizations/" + Organization_id + "/phones");
    };
    OrganizeService.prototype.getOrgPhone = function (org_id, phone_id) {
        return this.http.get("/api/organizations/" + org_id + "/phones/" + phone_id);
    };
    // Create an Organization
    OrganizeService.prototype.createOrganization = function (information) {
        return this.http.post("/api/organizations", JSON.stringify(information));
    };
    OrganizeService.prototype.updateOrganization = function (information, Organization_id) {
        return this.http.put("/api/organizations/" + Organization_id, JSON.stringify(information));
    };
    OrganizeService.prototype.getAllOrganizations = function () {
        return this.http.get("/api/organizations");
    };
    OrganizeService.prototype.getOrganization = function (organization_id) {
        return this.http.get("/api/organizations/" + organization_id);
    };
    OrganizeService.prototype.getUserOrganization = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/organizations");
    };
    OrganizeService.prototype.createAddress = function (newAddress, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/addresses", JSON.stringify(newAddress));
    };
    OrganizeService.prototype.updateAddress = function (information, org_id, add_id) {
        return this.http.put("/api/organizations/" + org_id + "/addresses/" + add_id, JSON.stringify(information));
    };
    OrganizeService.prototype.updateAddresses = function (information, org_id) {
        return this.http.put("/api/organizations/" + org_id + "/addresses", JSON.stringify(information));
    };
    OrganizeService.prototype.createPhone = function (newPhone, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/phones", JSON.stringify(newPhone));
    };
    OrganizeService.prototype.updatePhone = function (newPhone, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/phones", JSON.stringify(newPhone));
    };
    //----------------------------------------------------------------------------------------------------
    OrganizeService.prototype.bulkCreate = function (_a) {
        var url = _a[0], model = _a[1], indexName = _a[2];
        return this.http.post(url, JSON.stringify(model)).map(function (res) {
            return res[indexName];
        });
    };
    OrganizeService.prototype.bulkUpdate = function (_a) {
        var url = _a[0], model = _a[1], indexName = _a[2];
        return this.http.put(url, JSON.stringify(model)).map(function (res) {
            return res[indexName];
        });
    };
    OrganizeService.prototype.bulkAddress = function (addresses, org_id) {
        var model = { addresses: addresses };
        var url = "/api/organizations/" + org_id + "/addresses/bulk";
        return [url, model, 'addresses'];
    };
    OrganizeService.prototype.bulkCreateAddresses = function (addresses, org_id) {
        return this.bulkCreate(this.bulkAddress(addresses, org_id));
    };
    OrganizeService.prototype.bulkUpdateAddresses = function (addresses, org_id) {
        return this.bulkUpdate(this.bulkAddress(addresses, org_id));
    };
    OrganizeService.prototype.bulkPhone = function (phones, org_id) {
        var model = { phones: phones };
        var url = "/api/organizations/" + org_id + "/phones/bulk";
        return [url, model, 'phones'];
    };
    OrganizeService.prototype.bulkCreatePhones = function (phones, org_id) {
        return this.bulkCreate(this.bulkPhone(phones, org_id));
    };
    OrganizeService.prototype.bulkUpdatePhones = function (phones, org_id) {
        return this.bulkUpdate(this.bulkPhone(phones, org_id));
    };
    OrganizeService.prototype.makeStripePayment = function (org_id, payload) {
        return this.http.post("/api/make_payment/" + org_id, JSON.stringify(payload));
    };
    OrganizeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], OrganizeService);
    return OrganizeService;
}());
exports.OrganizeService = OrganizeService;
//# sourceMappingURL=organize.service.js.map
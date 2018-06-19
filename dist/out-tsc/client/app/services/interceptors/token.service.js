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
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var TokenService = /** @class */ (function () {
    function TokenService() {
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            charset: 'UTF-8'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    TokenService.prototype.getOptions = function () {
        return this.options;
    };
    TokenService.prototype.getUploadHeaders = function () {
        return new http_2.HttpHeaders()
            .set('charset', 'UTF-8');
        ;
    };
    TokenService.prototype.getJsonHeaders = function () {
        return new http_2.HttpHeaders()
            .set('Content-Type', 'application/json')
            .append('charset', 'UTF-8');
    };
    TokenService.prototype.getHeaders = function (url) {
        var isUpload = /upload/ig.test(url);
        var headers = isUpload ? this.getUploadHeaders() : this.getJsonHeaders();
        if (this.token) {
            headers = headers.append('Authorization', 'Bearer ' + this.token);
        }
        console.log('headers:', headers);
        return headers;
    };
    TokenService.prototype.getToken = function () {
        return this.token;
    };
    TokenService.prototype.setOptions = function (token) {
        this.token = token;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('charset', 'UTF-8');
        if (token) {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
        this.options = new http_1.RequestOptions({ headers: this.headers });
    };
    TokenService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map
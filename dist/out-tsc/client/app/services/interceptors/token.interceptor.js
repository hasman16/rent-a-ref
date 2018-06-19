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
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var token_service_1 = require("./token.service");
var index_1 = require("./../../shared/loader/index");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var _ = require("lodash");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router, tokenService, loaderService) {
        this.router = router;
        this.tokenService = tokenService;
        this.loaderService = loaderService;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var newRequest = request.clone({
            headers: this.tokenService.getHeaders(request.url)
        });
        this.loaderService.show();
        return next.handle(newRequest)
            .do(function (event) {
            _this.loaderService.hide();
            if (event instanceof http_1.HttpResponse) {
                // do stuff with response if you want
            }
        })
            .catch(function (err) {
            _this.loaderService.hide();
            if (err instanceof http_1.HttpErrorResponse) {
                if (err.status === 401 &&
                    _.toLower(err.statusText) === 'unauthorized') {
                    // redirect to the login route
                    // or show a modal
                    console.log('redirecting to logout');
                    _this.router.navigateByUrl('/logout');
                }
            }
            return Observable_1.Observable.throw(err);
        });
    };
    TokenInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            token_service_1.TokenService,
            index_1.LoaderService])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=token.interceptor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var index_1 = require("./../../services/http/index");
var token_service_1 = require("./token.service");
var index_2 = require("./../../shared/loader/index");
var token_interceptor_1 = require("./token.interceptor");
var http_1 = require("@angular/common/http");
describe('TokenInterceptor', function () {
    var service;
    var loadService;
    var tokenService;
    var httpMock;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [
                index_1.UserService,
                index_2.LoaderService,
                token_service_1.TokenService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                }
            ]
        });
        service = testing_1.TestBed.get(index_1.UserService);
        loadService = testing_1.TestBed.get(index_2.LoaderService);
        tokenService = testing_1.TestBed.get(token_service_1.TokenService);
        tokenService.setOptions('12345ABCDE');
        httpMock = testing_1.TestBed.get(testing_2.HttpTestingController);
    });
    it('should add an Authorization header', function () {
        service.getUsers().subscribe(function (response) {
            expect(response).toBeTruthy();
        });
        var httpRequest = httpMock.expectOne("/api/users");
        expect(httpRequest.request.headers.has('Authorization'));
        expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer 12345ABCDE');
    });
    it('should content-type set to json', function () {
        service.getUsers().subscribe(function (response) {
            expect(response).toBeTruthy();
        });
        var httpRequest = httpMock.expectOne("/api/users");
        expect(httpRequest.request.headers.has('Content-Type'));
        expect(httpRequest.request.headers.get('Content-Type')).toBe('application/json');
    });
    it('should charset set to UTF-8', function () {
        service.getUsers().subscribe(function (response) {
            expect(response).toBeTruthy();
        });
        var httpRequest = httpMock.expectOne("/api/users");
        expect(httpRequest.request.headers.has('charset'));
        expect(httpRequest.request.headers.get('charset')).toBe('UTF-8');
    });
});
//# sourceMappingURL=token.interceptor.spec.js.map
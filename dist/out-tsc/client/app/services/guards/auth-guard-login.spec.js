"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var router_1 = require("@angular/router");
var auth_guard_login_service_1 = require("./auth-guard-login.service");
var index_1 = require("./../http/index");
describe('AuthGuardService', function () {
    var mockCurrentUser = {
        status: ''
    };
    var mockAuthService = {
        loggedIn: false,
        isActive: false,
        getCurrentUser: function () {
            return mockCurrentUser;
        }
    };
    function setUp(mockAuthService) {
        testing_1.TestBed.configureTestingModule({
            providers: [
                auth_guard_login_service_1.AuthGuardLogin,
                {
                    provide: index_1.AuthService,
                    useValue: mockAuthService
                }
            ],
            imports: [testing_2.RouterTestingModule]
        });
    }
    describe(' test not loggedIn', function () {
        beforeEach(function () {
            mockAuthService.loggedIn = false;
            mockAuthService.isActive = false;
            setUp(mockAuthService);
        });
        // inject your guard service AND Router
        it('checks if a user is valid', testing_1.async(testing_1.inject([auth_guard_login_service_1.AuthGuardLogin, router_1.Router, index_1.AuthService], function (authGuardLogin, router, authService) {
            spyOn(router, 'navigate');
            expect(authGuardLogin.canActivate()).toBeFalsy();
            expect(authService.loggedIn).toBeFalsy();
            expect(authService.isActive).toBeFalsy();
            expect(router.navigate).toHaveBeenCalled();
        })));
    });
    describe('test user loggedIn', function () {
        beforeEach(function () {
            mockAuthService.loggedIn = true;
            mockAuthService.isActive = true;
            setUp(mockAuthService);
        });
        it('should return true', testing_1.async(testing_1.inject([auth_guard_login_service_1.AuthGuardLogin, router_1.Router, index_1.AuthService], function (authGuardLogin, router, authService) {
            spyOn(router, 'navigate');
            expect(authGuardLogin.canActivate()).toBeTruthy();
            expect(authService.loggedIn).toBeTruthy();
            expect(authService.isActive).toBeTruthy();
            expect(router.navigate).not.toHaveBeenCalled();
        })));
    });
});
//# sourceMappingURL=auth-guard-login.spec.js.map
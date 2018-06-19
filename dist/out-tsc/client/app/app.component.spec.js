"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var auth_service_1 = require("./services/auth.service");
xdescribe('Component: App', function () {
    var component;
    var fixture;
    var authService;
    var authServiceStub;
    beforeEach(testing_1.async(function () {
        authServiceStub = {
            loggedIn: false,
            isAdmin: false,
            currentUser: { username: 'Tester' }
        };
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            providers: [{ provide: auth_service_1.AuthService, useValue: authServiceStub }],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            component = fixture.componentInstance;
            authService = fixture.debugElement.injector.get(auth_service_1.AuthService);
            fixture.detectChanges();
        });
    }));
    it('should create the app', testing_1.async(function () {
        expect(component).toBeTruthy();
    }));
    it('should display the navigation bar correctly for guests', function () {
        var de = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
        expect(de.length).toBe(4);
        expect(de[0].nativeElement.textContent).toContain('Home');
        expect(de[1].nativeElement.textContent).toContain('Cats');
        expect(de[2].nativeElement.textContent).toContain('Login');
        expect(de[3].nativeElement.textContent).toContain('Register');
        expect(de[0].attributes['routerLink']).toBe('/');
        expect(de[1].attributes['routerLink']).toBe('/cats');
        expect(de[2].attributes['routerLink']).toBe('/login');
        expect(de[3].attributes['routerLink']).toBe('/register');
    });
    it('should display the navigation bar correctly for logged users', function () {
        authService.loggedIn = true;
        fixture.detectChanges();
        var de = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
        expect(de.length).toBe(4);
        expect(de[0].nativeElement.textContent).toContain('Home');
        expect(de[1].nativeElement.textContent).toContain('Cats');
        expect(de[2].nativeElement.textContent).toContain('Account (Tester)');
        expect(de[3].nativeElement.textContent).toContain('Logout');
        expect(de[0].attributes['routerLink']).toBe('/');
        expect(de[1].attributes['routerLink']).toBe('/cats');
        expect(de[2].attributes['routerLink']).toBe('/account');
        expect(de[3].attributes['routerLink']).toBe('/logout');
    });
    it('should display the navigation bar correctly for admin users', function () {
        authService.loggedIn = true;
        authService.isAdmin = true;
        fixture.detectChanges();
        var de = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
        expect(de.length).toBe(5);
        expect(de[0].nativeElement.textContent).toContain('Home');
        expect(de[1].nativeElement.textContent).toContain('Cats');
        expect(de[2].nativeElement.textContent).toContain('Account (Tester)');
        expect(de[3].nativeElement.textContent).toContain('Admin');
        expect(de[4].nativeElement.textContent).toContain('Logout');
        expect(de[0].attributes['routerLink']).toBe('/');
        expect(de[1].attributes['routerLink']).toBe('/cats');
        expect(de[2].attributes['routerLink']).toBe('/account');
        expect(de[3].attributes['routerLink']).toBe('/admin');
        expect(de[4].attributes['routerLink']).toBe('/logout');
    });
});
//# sourceMappingURL=app.component.spec.js.map
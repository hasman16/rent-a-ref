"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var about_component_1 = require("./about.component");
describe('Component: About', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [about_component_1.AboutComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(about_component_1.AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should display the string "About" in h4', function () {
        var el = fixture.debugElement.query(platform_browser_1.By.css('h4')).nativeElement;
        expect(el.textContent).toContain('About');
    });
});
//# sourceMappingURL=about.component.spec.js.map
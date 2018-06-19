"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var not_found_component_1 = require("./not-found.component");
describe('NotFoundComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [not_found_component_1.NotFoundComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(not_found_component_1.NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should display the string "404 Not Found" in h4', function () {
        var el = fixture.debugElement.query(platform_browser_1.By.css('h4')).nativeElement;
        expect(el.textContent).toContain('404 Not Found');
    });
});
//# sourceMappingURL=not-found.component.spec.js.map
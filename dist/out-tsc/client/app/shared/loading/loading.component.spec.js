"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var loading_component_1 = require("./loading.component");
describe('LoadingComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [loading_component_1.LoadingComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(loading_component_1.LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
    it('should not show the DOM element', function () {
        var de = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(de).toBeNull();
    });
    it('should show the DOM element', function () {
        component.condition = true;
        fixture.detectChanges();
        expect(component).toBeTruthy();
        var de = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var el = de.nativeElement;
        expect(de).toBeDefined();
        expect(el.textContent).toContain('Loading...');
    });
});
//# sourceMappingURL=loading.component.spec.js.map
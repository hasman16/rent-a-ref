"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var resetpassword_component_1 = require("./resetpassword.component");
describe('ResetPasswordComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [resetpassword_component_1.ResetPasswordComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(resetpassword_component_1.ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    /*it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should display the string "Login" in h4', () => {
      const el = fixture.debugElement.query(By.css('h4')).nativeElement;
      expect(el.textContent).toContain('Login');
    });*/
});
//# sourceMappingURL=resetpassword.component.spec.js.map
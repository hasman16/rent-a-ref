"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_po_1 = require("./app.po");
describe('angular2-full-stack App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.Angular2FullStackPage();
    });
    it('should display the navbar correctly', function () {
        page.navigateTo();
        expect(page.getNavbarElement(0)).toEqual('Home');
        expect(page.getNavbarElement(1)).toEqual('Cats');
        expect(page.getNavbarElement(2)).toEqual('Login');
        expect(page.getNavbarElement(3)).toEqual('Register');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map
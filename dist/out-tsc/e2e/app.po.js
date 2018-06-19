"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var Angular2FullStackPage = /** @class */ (function () {
    function Angular2FullStackPage() {
    }
    Angular2FullStackPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    Angular2FullStackPage.prototype.getNavbarElement = function (n) {
        return protractor_1.$$('app-root a').get(n).getText();
    };
    return Angular2FullStackPage;
}());
exports.Angular2FullStackPage = Angular2FullStackPage;
//# sourceMappingURL=app.po.js.map
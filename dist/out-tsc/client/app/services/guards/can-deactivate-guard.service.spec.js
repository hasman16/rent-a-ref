"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var can_deactivate_guard_service_1 = require("./can-deactivate-guard.service");
describe("CanDeactivateGuardService", function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [can_deactivate_guard_service_1.CanDeactivateGuardService]
        });
    });
    it("should be created", testing_1.inject([can_deactivate_guard_service_1.CanDeactivateGuardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=can-deactivate-guard.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanDeactivateGuardService = /** @class */ (function () {
    function CanDeactivateGuardService() {
    }
    CanDeactivateGuardService.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return component.canDeactivate();
    };
    return CanDeactivateGuardService;
}());
exports.CanDeactivateGuardService = CanDeactivateGuardService;
//# sourceMappingURL=can-deactivate-guard.service.js.map
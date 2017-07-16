"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (function () {
    function ResponseService() {
    }
    ResponseService.prototype.success = function (res, message) {
        res.status(200).json(message);
    };
    ResponseService.prototype.failure = function (res, message) {
        res.status(403).json({
            success: false,
            message: message
        });
    };
    ResponseService.prototype.exception = function (res, error) {
        res.status(500).json({
            success: false,
            message: 'An Internal Error Occurred'
        });
    };
    return ResponseService;
}());
//# sourceMappingURL=responseService.js.map
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
    ResponseService.prototype.isAdmin = function (req) {
        var authorization = req.decoded.accessLevel;
        return (authorization === 1 || authorization === 2);
    };
    ResponseService.prototype.isUser = function (req) {
        return req.decoded.id === req.params.id;
    };
    ResponseService.prototype.isUserOrAdmin = function (req) {
        return this.isUser(req) || this.isAdmin(req);
    };
    ResponseService.prototype.permissionViolation = function (res) {
        this.failure(res, "Permissions violation.");
    };
    ResponseService.prototype.executeAsAdmin = function (req, res, callback) {
        if (this.isAdmin(req)) {
            callback();
        }
        else {
            this.permissionViolation(res);
        }
    };
    return ResponseService;
}());
//# sourceMappingURL=responseService.js.map
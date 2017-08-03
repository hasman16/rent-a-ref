"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (function () {
    function ResponseService() {
    }
    ResponseService.prototype.success = function (res, message, status) {
        if (status === void 0) { status = 200; }
        res.status(status).json(message);
    };
    ResponseService.prototype.successCollection = function (res, collection, status) {
        if (status === void 0) { status = 200; }
        var message = {
            success: true,
            data: collection
        };
        this.success(res, message, status);
    };
    ResponseService.prototype.failure = function (res, message, status) {
        if (status === void 0) { status = 403; }
        res.status(status).json({
            success: false,
            message: message
        });
    };
    ResponseService.prototype.exception = function (res, error) {
        console.log('errored:', error);
        this.failure(res, 'An Internal Error Occurred', 500);
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
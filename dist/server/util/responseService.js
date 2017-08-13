"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseService = (function () {
    function ResponseService(models) {
        this.models = models;
    }
    ResponseService.prototype.makeObject = function (req) {
        var obj = Object.assign({}, req.body);
        delete obj.created_at;
        delete obj.deleted_at;
        delete obj.updated_at;
        return obj;
    };
    ResponseService.prototype.limitOffset = function (clauses, req, attributes) {
        if (attributes === void 0) { attributes = ['id']; }
        var query = req.query || {
            offset: 0,
            limit: 10
        };
        var limit = (parseInt(query.limit) || 10);
        var offset = (parseInt(query.offset) || 0) * 10;
        var order = query.order || 'ASC';
        order = attributes.map(function (attribute) {
            return [attribute, order];
        });
        offset = Math.max(offset, 0);
        limit = Math.max(limit, 1);
        limit = Math.min(limit, 20);
        clauses.offest = offset;
        clauses.limit = limit;
        clauses.order = order;
        return clauses;
    };
    ResponseService.prototype.findOne = function (Model, obj_id, res, callback, status) {
        var _this = this;
        if (status === void 0) { status = 200; }
        Model.findOne({
            where: {
                id: obj_id
            }
        }).
            then(callback)
            .then(function (obj) { return _this.success(res, obj, status); })
            .catch(function (error) { return _this.exception(res, error, 400); });
    };
    ResponseService.prototype.findObject = function (obj_id, name, res, callback, status) {
        var _this = this;
        if (status === void 0) { status = 200; }
        var foundObject = function (obj) {
            if (!obj) {
                _this.failure(res, name + ' Not Found.', 404);
            }
            else {
                return callback(obj);
            }
        };
        var Model = this.models[name];
        this.findOne(Model, obj_id, res, foundObject, status);
    };
    ResponseService.prototype.success = function (res, message, status) {
        if (status === void 0) { status = 200; }
        if (typeof message === 'string') {
            message = {
                success: true,
                message: message
            };
        }
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
    ResponseService.prototype.exception = function (res, error, status) {
        if (status === void 0) { status = 500; }
        console.log('errored:', error.message);
        this.failure(res, 'An Internal Error Occurred', status);
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
        this.failure(res, "Forbidden: Permissions violation.");
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
exports.default = ResponseService;
//# sourceMappingURL=responseService.js.map
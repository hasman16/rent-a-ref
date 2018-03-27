"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ResponseService = /** @class */ (function () {
    function ResponseService(models) {
        this.models = models;
    }
    ResponseService.prototype.makeObject = function (req) {
        return this.getItemFromBody(req);
    };
    ResponseService.prototype.limitOffset = function (clauses, req, attributes) {
        if (attributes === void 0) { attributes = ['id']; }
        var query = Object.assign({}, {
            offset: 0,
            limit: 10
        }, req.query);
        var limit = parseInt(query.limit, 10) || 10;
        var offset = (parseInt(query.offset, 10) || 0) * 10;
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
    ResponseService.prototype.getItemFromBody = function (req) {
        var obj = Object.assign({}, req.body);
        return this.deleteItemDates(obj);
    };
    ResponseService.prototype.deleteItemDates = function (oldItem) {
        var item = _.cloneDeep(oldItem);
        delete item.created_at;
        delete item.deleted_at;
        delete item.updated_at;
        return item;
    };
    ResponseService.prototype.deleteId = function (oldItem) {
        var item = _.cloneDeep(oldItem);
        delete item.id;
        return item;
    };
    ResponseService.prototype.firstKeyFromReqBody = function (req) {
        return _.head(_.keys(req.body));
    };
    ResponseService.prototype.getArrayFromBody = function (req) {
        var key = this.firstKeyFromReqBody(req);
        return req.body[key];
    };
    ResponseService.prototype.findOne = function (Model, obj_id, res, callback, status) {
        var _this = this;
        if (status === void 0) { status = 200; }
        Model.findOne({
            where: {
                id: obj_id
            }
        })
            .then(callback)
            .then(function (obj) { return _this.success(res, obj, status); })
            .catch(function (error) { return _this.exception(res, error, 400); });
    };
    ResponseService.prototype.joinTableCreate = function (itemsJoin, tableJoin) {
        return function (t, item) {
            var model = itemsJoin(item);
            return tableJoin.create(model, { transaction: t });
        };
    };
    ResponseService.prototype.baseTableCreate = function (baseTable, joinTableCreate) {
        var createFunction = function (t, item) {
            return baseTable.create(item, { transaction: t }).then(function (newItem) {
                return joinTableCreate(t, newItem);
            });
        };
        return _.bind(this.create, this, createFunction);
    };
    ResponseService.prototype.baseTableBulkCreate = function (baseTable, joinTableCreate) {
        var sequelize = this.models.sequelize;
        var createFunction = function (t, items) {
            return baseTable
                .bulkCreate(items, { transaction: t, returning: true })
                .then(function (items) {
                return sequelize.Promise.each(items, function (item) {
                    return joinTableCreate(t, item);
                });
            });
        };
        return _.bind(this.bulkCreate, this, createFunction);
    };
    ResponseService.prototype.bulkUpdateQuery = function (baseTable, joinTable, joinMethod) {
        var query = function (t, item) {
            return joinTable
                .findOne({
                where: joinMethod(item)
            }, { transaction: t, returning: true })
                .then(function (newItem) {
                if (newItem) {
                    return baseTable.update(item, {
                        where: {
                            id: item.id
                        }
                    }, { transaction: t, returning: true });
                }
            });
        };
        return _.bind(this.bulkUpdate, this, query);
    };
    ResponseService.prototype.selectBaseTableQuery = function (type, baseTable, joinTableCreate) {
        var _this = this;
        var tableAction;
        switch (type) {
            case 'create':
                tableAction = this.baseTableCreate(baseTable, joinTableCreate);
                break;
            case 'bulkCreate':
                tableAction = this.baseTableBulkCreate(baseTable, joinTableCreate);
                break;
            default:
                tableAction = function (req, res) { return _this.exception(res, 'Unknown method'); };
                break;
        }
        return tableAction;
    };
    ResponseService.prototype.executeCreate = function (res, createFunction, args) {
        var _this = this;
        var sequelize = this.models.sequelize;
        sequelize
            .transaction(function (t) {
            return createFunction(t, args).then(function (result) {
                _this.success(res, result, 201);
            });
        })
            .catch(function (error) { return _this.exception(res, error); });
    };
    ResponseService.prototype.create = function (baseTableCreate, req, res) {
        var item = this.deleteId(this.getItemFromBody(req));
        this.executeCreate(res, baseTableCreate, item);
    };
    ResponseService.prototype.getBulkItemsArrayFromBody = function (req, filterFunction) {
        var _this = this;
        return _(this.getArrayFromBody(req))
            .filter(filterFunction)
            .map(function (item) { return _this.deleteItemDates(item); })
            .value();
    };
    ResponseService.prototype.bulkCreate = function (baseTableBulkCreate, req, res) {
        var filterFunction = function (item) { return _.isNil(item.id); };
        var newItems = this.getBulkItemsArrayFromBody(req, filterFunction);
        this.executeCreate(res, baseTableBulkCreate, newItems);
    };
    ResponseService.prototype.bulkUpdate = function (bulkUpdateQuery, req, res) {
        var _this = this;
        var sequelize = this.models.sequelize;
        var filterFunction = function (item) { return !_.isNil(item.id); };
        var items = this.getBulkItemsArrayFromBody(req, filterFunction);
        sequelize
            .transaction(function (t) {
            return sequelize.Promise.each(items, function (item) {
                return bulkUpdateQuery(t, item);
            }).then(function (items) {
                _this.success(res, items, 200);
            });
        })
            .catch(function (error) { return _this.exception(res, error); });
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
        if (!collection || (Array.isArray(collection) && collection.length === 0)) {
            status = 204;
        }
        this.success(res, collection, status);
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
        //console.log('errored:', error);
        this.failure(res, 'An Internal Error Occurred', status);
    };
    ResponseService.prototype.isAdmin = function (req) {
        var authorization = Number(req.decoded.authorization);
        return authorization === 1 || authorization === 2;
    };
    ResponseService.prototype.isUser = function (req) {
        return req.decoded.id === req.params.id;
    };
    ResponseService.prototype.isUserOrAdmin = function (req) {
        return this.isUser(req) || this.isAdmin(req);
    };
    ResponseService.prototype.permissionViolation = function (res) {
        this.failure(res, 'Forbidden: Permissions violation.');
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
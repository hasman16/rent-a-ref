"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleMapsClient = require("@google/maps");
var _ = require("lodash");
var moment = require("moment-timezone");
var googleMapsClient = GoogleMapsClient.createClient({
    key: process.env.GOOGLEMAPS_KEY,
    Promise: Promise
});
var ResponseService = /** @class */ (function () {
    function ResponseService(models) {
        this.models = models;
    }
    ResponseService.prototype.makeObject = function (req) {
        return this.getItemFromBody(req);
    };
    ResponseService.prototype.produceSearchAndSortClause = function (req) {
        var whereClause = {
            where: this.produceWhereClause(req)
        };
        var limitOffSetSort = this.produceLimitOffsetAndSort(req);
        return Object.assign(whereClause, limitOffSetSort);
    };
    ResponseService.prototype.produceWhereClause = function (req) {
        var Op = this.models.sequelize.Op;
        var attributepairs = String(req.query.search).split(',');
        var keyvalues = attributepairs
            .map(function (keyvalue) {
            return keyvalue.split('|');
        })
            .filter(function (entries) { return _.isArray(entries) && entries.length === 2; })
            .map(function (entries) {
            var value = (entries[1] || '') + '%';
            var key = entries[0] || 'badkey';
            var obj = {};
            //console.log('key, value', key, value);
            obj[key] = (_a = {},
                _a[Op.like] = value,
                _a);
            return obj;
            var _a;
        });
        return Object.assign.apply(Object, [{}].concat(keyvalues));
    };
    ResponseService.prototype.produceLimitOffsetAndSort = function (req) {
        var query = Object.assign({}, {
            offset: 0,
            limit: 20
        }, req.query);
        var limit = parseInt(query.limit, 10) || 20;
        var offset = parseInt(query.offset, 10) || 0;
        var sortby = String(query.sortby || 'id').split(',');
        var order = _.toUpper(query.order);
        order = _.includes(['ASC', 'DESC'], order) ? order : 'ASC';
        order = sortby.map(function (attribute) {
            return [attribute, order];
        });
        limit = Math.min(Math.max(limit, 1), 20);
        offset = Math.max(offset, 0) * limit;
        return {
            limit: limit,
            offset: offset,
            order: order
        };
    };
    ResponseService.prototype.getItemFromBody = function (req) {
        var obj = Object.assign({}, req.body);
        return this.deleteItemDates(obj);
    };
    ResponseService.prototype.deleteItemDates = function (oldItem) {
        var item = _.cloneDeep(oldItem);
        if (item) {
            delete item.created_at;
            delete item.deleted_at;
            delete item.updated_at;
        }
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
        if (error === void 0) { error = 'An Internal Error Occurred'; }
        if (status === void 0) { status = 500; }
        //console.log('errored:', error);
        this.failure(res, error, status);
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
    ResponseService.prototype.workoutTimeZone = function (model, address) {
        return __awaiter(this, void 0, void 0, function () {
            var googleAddress, geometry, location, googleTimeZone, event_date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAddress(address)];
                    case 1:
                        googleAddress = _a.sent();
                        geometry = _.get(googleAddress, 'results[0].geometry', null);
                        if (!geometry) {
                            throw new Error('Error searching for address.');
                        }
                        location = geometry.location;
                        return [4 /*yield*/, this.getTimezone([
                                location.lat,
                                location.lng
                            ])];
                    case 2:
                        googleTimeZone = _a.sent();
                        if (!googleTimeZone) {
                            throw new Error('Error searching for timezone.');
                        }
                        model.timezone_id = googleTimeZone.timeZoneId;
                        model.timezone_name = googleTimeZone.timeZoneName;
                        model.timezone = googleTimeZone.rawOffset;
                        model.timezone_offset = googleTimeZone.dstOffset;
                        event_date = moment.tz(model.date, model.timezone_id);
                        model.date = event_date.utc().valueOf();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResponseService.prototype.getAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var addressString;
            return __generator(this, function (_a) {
                addressString = address.state + ' ' + address.zip;
                //addressString = '1600 Amphitheatre Parkway, Mountain View, CA';
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        googleMapsClient
                            .geocode({ address: addressString })
                            .asPromise()
                            .then(function (response) {
                            resolve(response.json);
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    ResponseService.prototype.getTimezone = function (location, timestamp) {
        if (timestamp === void 0) { timestamp = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        googleMapsClient
                            .timezone({
                            location: location
                        })
                            .asPromise()
                            .then(function (response) {
                            resolve(response.json);
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    ResponseService.prototype.isTimeLocked = function (eventObj, lock, grain) {
        if (lock === void 0) { lock = 1; }
        if (grain === void 0) { grain = 'minutes'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var now = moment().utc();
                        var matchTime = moment.tz(eventObj.date, eventObj.timezone_id);
                        var lockTime = matchTime.utc().subtract(lock, 'hour');
                        var result = now.isSameOrBefore(lockTime, grain);
                        if (result) {
                            resolve({
                                success: true,
                                message: 'Event is before lock time'
                            });
                        }
                        else {
                            reject({
                                success: false,
                                message: 'Event is now locked'
                            });
                        }
                    })];
            });
        });
    };
    return ResponseService;
}());
exports.default = ResponseService;
//# sourceMappingURL=responseService.js.map
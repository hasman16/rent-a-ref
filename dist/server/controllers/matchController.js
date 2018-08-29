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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
function MatchController(models, ResponseService) {
    var sequelize = models.sequelize;
    var Match = models.Match;
    var Address = models.Address;
    var attributes = ['id'];
    function returnMatch(res, match, status) {
        if (status === void 0) { status = 200; }
        var newMatch = ResponseService.deleteItemDates(match);
        newMatch.id = match.id;
        ResponseService.success(res, newMatch, status);
    }
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Match.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getAllByGame(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var User = models.User;
        var whereClause = Object.assign({
            where: {
                game_id: req.params.game_id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email'],
                    through: {}
                }
            ]
        }, clause);
        Match.findAndCountAll(whereClause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        var Address = models.Address;
        var Phone = models.Phone;
        Match.findOne({
            where: {
                id: req.params.match_id
            },
            include: [
                {
                    model: Address
                },
                {
                    model: Phone
                }
            ]
        })
            .then(function (results) {
            ResponseService.success(res, results);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var match = ResponseService.getItemFromBody(req);
        Match.create(match)
            .then(function (newMatch) {
            returnMatch(res, newMatch, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function canAssignOrRemove(value) {
        return value === 'pending' || value === 'none' || value === 'active';
    }
    function update(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var match, sequelize, Officiating, match_id, Address, Phone, address, phone, relation, transaction, oldMatch, newMatch, oldAddress, oldPhone, dateTime, newMatch_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        match = ResponseService.getItemFromBody(req);
                        sequelize = models.sequelize;
                        Officiating = models.Officiating;
                        match_id = req.params.match_id;
                        Address = models.Address;
                        Phone = models.Phone;
                        address = ResponseService.deleteItemDates(match.address);
                        phone = ResponseService.deleteItemDates(match.phone);
                        relation = {
                            where: {
                                id: match_id
                            }
                        };
                        match = ResponseService.deleteItemDates(match);
                        delete match.id;
                        delete match.address_id;
                        delete match.phone_id;
                        delete match.address;
                        delete match.phone;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 16, , 17]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findById(match_id, {
                                transaction: transaction
                            })];
                    case 3:
                        oldMatch = _a.sent();
                        if (!(oldMatch && canAssignOrRemove(oldMatch.status))) return [3 /*break*/, 13];
                        if (!phone) return [3 /*break*/, 6];
                        return [4 /*yield*/, Phone.findById(oldMatch.phone_id, {
                                transaction: transaction
                            })];
                    case 4:
                        oldPhone = _a.sent();
                        match.phone_id = oldPhone.id;
                        if (!oldPhone) return [3 /*break*/, 6];
                        return [4 /*yield*/, Phone.update(phone, {
                                where: { id: oldPhone.id }
                            }, { transaction: transaction })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!address) return [3 /*break*/, 11];
                        dateTime = match.date + 'T' + match.time;
                        match.date = dateTime.replace(/z/i, '');
                        return [4 /*yield*/, ResponseService.workoutTimeZone(match, address)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, Address.findById(oldMatch.address_id, {
                                transaction: transaction
                            })];
                    case 8:
                        oldAddress = _a.sent();
                        if (!oldAddress) return [3 /*break*/, 10];
                        match.address_id = oldAddress.id;
                        return [4 /*yield*/, Address.update(address, {
                                where: {
                                    id: oldAddress.id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        match.date = oldMatch.date;
                        delete match.timezone_id;
                        delete match.timezone_name;
                        delete match.timezone;
                        delete match.timezone_offset;
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13: throw new Error('Cannot update match.');
                    case 14: return [4 /*yield*/, Match.update(match, relation, {
                            transaction: transaction
                        })];
                    case 15:
                        newMatch_1 = _a.sent();
                        transaction.commit();
                        ResponseService.success(res, 'Match updated', 200);
                        return [3 /*break*/, 17];
                    case 16:
                        error_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1, 404);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    }
    function deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Officiating, match_id, relation, transaction, match, officiate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Officiating = models.Officiating;
                        match_id = req.params.match_id;
                        relation = {
                            where: {
                                id: match_id
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findById(match_id, {
                                transaction: transaction
                            })];
                    case 3:
                        match = _a.sent();
                        if (!match) {
                            throw new Error('Match not found.');
                        }
                        return [4 /*yield*/, Match.destroy(relation, {
                                transaction: transaction
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Officiating.findOne(relation, {
                                transaction: transaction
                            })];
                    case 5:
                        officiate = _a.sent();
                        if (!officiate) return [3 /*break*/, 7];
                        return [4 /*yield*/, Officiating.destroy(relation, {
                                transaction: transaction
                            }, {
                                transaction: transaction
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        transaction.commit();
                        ResponseService.success(res, 'Match and Referee assignments deleted', 204);
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_2, 404);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function createMatchAddressPhone(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Address, Phone, match, address, phone, transaction, newMatch, newAddress, newPhone, dateTime, aMatch, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Address = models.Address;
                        Phone = models.Phone;
                        match = ResponseService.getItemFromBody(req);
                        address = ResponseService.deleteItemDates(match.address);
                        phone = ResponseService.deleteItemDates(match.phone);
                        delete match.address_id;
                        delete match.phone_id;
                        delete match.address;
                        delete match.phone;
                        match.game_id = req.params.game_id;
                        match.status = 'pending';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        dateTime = match.date + 'T' + match.time;
                        match.date = dateTime.replace(/z/i, '');
                        return [4 /*yield*/, ResponseService.workoutTimeZone(match, address)];
                    case 3:
                        _a.sent();
                        if (!address) return [3 /*break*/, 6];
                        return [4 /*yield*/, Address.create(address, { transaction: transaction })];
                    case 4:
                        newAddress = _a.sent();
                        match.address_id = newAddress.id;
                        if (!newAddress) return [3 /*break*/, 6];
                        return [4 /*yield*/, Address.update({
                                lat: address.lat,
                                lng: address.lng
                            }, {
                                where: {
                                    id: newAddress.id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!phone) return [3 /*break*/, 8];
                        return [4 /*yield*/, Phone.create(phone, { transaction: transaction })];
                    case 7:
                        newPhone = _a.sent();
                        match.phone_id = newPhone.id;
                        _a.label = 8;
                    case 8: return [4 /*yield*/, Match.create(match, { transaction: transaction })];
                    case 9:
                        newMatch = _a.sent();
                        transaction.commit();
                        aMatch = ResponseService.deleteItemDates(newMatch);
                        ResponseService.success(res, aMatch, 201);
                        return [3 /*break*/, 11];
                    case 10:
                        error_3 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_3);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    }
    function getMatchAddress(req, res) {
        this.getOne(req, res);
    }
    function updateMatchAddress(req, res) { }
    function deleteMatchAddress(req, res) { }
    return {
        getAll: getAll,
        getAllByGame: getAllByGame,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getMatchAddress: getMatchAddress,
        createMatchAddressPhone: createMatchAddressPhone,
        updateMatchAddress: updateMatchAddress,
        deleteMatchAddress: deleteMatchAddress
    };
}
exports.default = MatchController;
//# sourceMappingURL=matchController.js.map
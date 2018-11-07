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
    function getAllByMeeting(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var User = models.User;
        var whereClause = Object.assign({
            where: {
                meeting_id: req.params.meeting_id
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
    function processTime(match, timeZome) {
        match.date = ResponseService.addTimeToDate(match.time, match.date);
        match.date = ResponseService.calculateDate(match.date, match.timezone_id);
    }
    function update(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var match, sequelize, Officiating, match_id, Address, Phone, address, phone, relation, transaction, oldMatch, newMatch, oldAddress, oldPhone, timeZone, newMatch_1, error_1;
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
                        _a.trys.push([1, 17, , 18]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findById(match_id, {
                                transaction: transaction
                            })];
                    case 3:
                        oldMatch = _a.sent();
                        if (!(oldMatch && canAssignOrRemove(oldMatch.status))) return [3 /*break*/, 14];
                        return [4 /*yield*/, isOrgMemberOrAdmin(req, oldMatch.meeting_id)];
                    case 4:
                        _a.sent();
                        if (!phone) return [3 /*break*/, 7];
                        return [4 /*yield*/, Phone.findById(oldMatch.phone_id, {
                                transaction: transaction
                            })];
                    case 5:
                        oldPhone = _a.sent();
                        match.phone_id = oldPhone.id;
                        if (!oldPhone) return [3 /*break*/, 7];
                        return [4 /*yield*/, Phone.update(phone, {
                                where: { id: oldPhone.id }
                            }, { transaction: transaction })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!address) return [3 /*break*/, 12];
                        return [4 /*yield*/, ResponseService.workoutTimeZone(address)];
                    case 8:
                        timeZone = _a.sent();
                        ResponseService.setTimeZone(match, timeZone.googleTimeZone);
                        address.lat = timeZone.location.lat;
                        address.lng = timeZone.location.lng;
                        processTime(match, timeZone);
                        return [4 /*yield*/, Address.findById(oldMatch.address_id, {
                                transaction: transaction
                            })];
                    case 9:
                        oldAddress = _a.sent();
                        if (!oldAddress) return [3 /*break*/, 11];
                        match.address_id = oldAddress.id;
                        return [4 /*yield*/, Address.update(address, {
                                where: {
                                    id: oldAddress.id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        match.date = oldMatch.date;
                        delete match.timezone_id;
                        delete match.timezone_name;
                        delete match.timezone;
                        delete match.timezone_offset;
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14: throw new Error('Cannot update match.');
                    case 15: return [4 /*yield*/, Match.update(match, relation, {
                            transaction: transaction
                        })];
                    case 16:
                        newMatch_1 = _a.sent();
                        transaction.commit();
                        ResponseService.success(res, 'Match updated', 200);
                        return [3 /*break*/, 18];
                    case 17:
                        error_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1, 404);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
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
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        transaction.commit();
                        ResponseService.success(res, 'Match and Referee assignments deleted.', 204);
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
            var sequelize, Address, Phone, match, address, phone, transaction, newMatch, newAddress, newPhone, timeZone, aMatch, error_3;
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
                        match.meeting_id = req.params.meeting_id;
                        match.status = 'pending';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, isOrgMemberOrAdmin(req, match.meeting_id)];
                    case 3:
                        _a.sent();
                        if (!address) return [3 /*break*/, 6];
                        return [4 /*yield*/, ResponseService.workoutTimeZone(address)];
                    case 4:
                        timeZone = _a.sent();
                        ResponseService.setTimeZone(match, timeZone.googleTimeZone);
                        address.lat = timeZone.location.lat;
                        address.lng = timeZone.location.lng;
                        processTime(match, timeZone);
                        return [4 /*yield*/, Address.create(address, { transaction: transaction })];
                    case 5:
                        newAddress = _a.sent();
                        match.address_id = newAddress.id;
                        return [3 /*break*/, 7];
                    case 6:
                        delete match.date;
                        _a.label = 7;
                    case 7:
                        if (!phone) return [3 /*break*/, 9];
                        return [4 /*yield*/, Phone.create(phone, { transaction: transaction })];
                    case 8:
                        newPhone = _a.sent();
                        match.phone_id = newPhone.id;
                        _a.label = 9;
                    case 9: return [4 /*yield*/, Match.create(match, { transaction: transaction })];
                    case 10:
                        newMatch = _a.sent();
                        transaction.commit();
                        aMatch = ResponseService.deleteItemDates(newMatch);
                        ResponseService.success(res, aMatch, 201);
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_3);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    function getMatchAddress(req, res) {
        this.getOne(req, res);
    }
    function updateMatchAddress(req, res) { }
    function deleteMatchAddress(req, res) { }
    function isOrgMemberOrAdmin(req, meeting_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize_1, Meeting, Organizer, meeting, whereClause, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ResponseService.isAdmin(req)) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                success: true,
                                message: 'Is Admin'
                            }];
                    case 1:
                        sequelize_1 = models.sequelize;
                        Meeting = models.Meeting;
                        Organizer = models.Organizer;
                        return [4 /*yield*/, Meeting.findById(meeting_id)];
                    case 2:
                        meeting = _a.sent();
                        whereClause = {
                            user_id: req.decoded.id,
                            organization_id: meeting.organization_id
                        };
                        return [4 /*yield*/, Organizer.findOne(whereClause)];
                    case 3:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, {
                                    success: true,
                                    message: 'Event is before lock time'
                                }];
                        }
                        else {
                            throw new Error('Event is now locked');
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return {
        getAll: getAll,
        getAllByMeeting: getAllByMeeting,
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
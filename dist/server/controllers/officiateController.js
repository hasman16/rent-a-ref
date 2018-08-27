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
var _ = require("lodash");
function OfficiateController(models, ResponseService, SendGridService) {
    var sequelize = models.sequelize;
    var Match = models.Match;
    var Officiating = models.Officiating;
    var User = models.User;
    var attributes = [
        'id',
        'email',
        'authorization',
        'can_organize',
        'can_referee',
        'status'
    ];
    function refereeSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, clause, Op, whereClause, transaction, result, whereOfficiate, matchOfficiate, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        clause = ResponseService.produceSearchAndSortClause(req);
                        Op = models.sequelize.Op;
                        whereClause = Object.assign(clause, {
                            where: {},
                            include: [
                                {
                                    model: User,
                                    where: {
                                        id: req.params.user_id
                                    },
                                    through: {
                                        where: {
                                            status: (_a = {},
                                                _a[Op.notLike] = '%decline%',
                                                _a)
                                        }
                                    }
                                }
                            ]
                        });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _d.sent();
                        return [4 /*yield*/, Match.findAndCountAll(whereClause, {
                                transaction: transaction
                            })];
                    case 3:
                        result = _d.sent();
                        whereOfficiate = Object.assign({
                            where: {
                                id: (_b = {},
                                    _b[Op.in] = _.map(result.rows, function (item) { return item.id; }),
                                    _b)
                            },
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'email'],
                                    through: {
                                        where: {
                                            status: (_c = {},
                                                _c[Op.notLike] = '%decline%',
                                                _c)
                                        }
                                    }
                                }
                            ]
                        }, clause);
                        return [4 /*yield*/, Match.findAndCountAll(whereOfficiate, {
                                transaction: transaction
                            })];
                    case 4:
                        matchOfficiate = _d.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 5:
                        _d.sent();
                        ResponseService.success(res, matchOfficiate);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _d.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1, 400);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function officialsByMatch(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign({
            where: {},
            attributes: ['id', 'email', 'can_referee', 'status'],
            include: [
                {
                    model: Match,
                    attributes: ['id', 'status'],
                    where: {
                        id: req.params.match_id
                    },
                    required: false
                }
            ]
        }, clause);
        User.findAndCountAll(whereClause)
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function matchOfficials(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Op, Address, Phone, Person, Image, clause, whereClause;
            return __generator(this, function (_b) {
                Op = models.sequelize.Op;
                Address = models.Address;
                Phone = models.Phone;
                Person = models.Person;
                Image = models.Image;
                clause = ResponseService.produceSearchAndSortClause(req);
                whereClause = Object.assign({
                    where: {},
                    attributes: ['id', 'email'],
                    include: [
                        {
                            model: Person,
                            attributes: ['firstname', 'middlenames', 'lastname']
                        },
                        {
                            model: Address
                        },
                        {
                            model: Phone
                        },
                        {
                            model: Image
                        },
                        {
                            model: Match,
                            attributes: ['id', 'status'],
                            where: {
                                id: req.params.match_id
                            },
                            through: {
                                where: {
                                    status: (_a = {},
                                        _a[Op.like] = '%accept%',
                                        _a)
                                }
                            }
                        }
                    ]
                }, clause);
                User.findAndCountAll(whereClause)
                    .then(function (result) { return ResponseService.success(res, result); })
                    .catch(function (error) { return ResponseService.exception(res, error); });
                return [2 /*return*/];
            });
        });
    }
    function canAssignOrRemove(value) {
        return value === 'pending' || value === 'none' || value === 'active';
    }
    function adminTimeLockByPass(req, match) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!ResponseService.isAdmin(req)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ResponseService.isTimeLocked(match)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function addOfficialToMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var executeMethod;
            var _this = this;
            return __generator(this, function (_a) {
                executeMethod = function (user, match, officiate, transaction) { return __awaiter(_this, void 0, void 0, function () {
                    var isOfficiating, status_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!officiate) return [3 /*break*/, 5];
                                status_1 = _.lowerCase(officiate.status);
                                if (!(status_1 === 'accepted')) return [3 /*break*/, 1];
                                throw new Error('Referee is already officiating this match.');
                            case 1:
                                if (!(status_1 === 'declined')) return [3 /*break*/, 3];
                                return [4 /*yield*/, Officiating.update({
                                        status: 'pending'
                                    }, {
                                        where: {
                                            user_id: user.id,
                                            match_id: match.id
                                        }
                                    }, { transaction: transaction })];
                            case 2:
                                isOfficiating = _a.sent();
                                return [3 /*break*/, 4];
                            case 3: throw new Error('Unable to assign referee to this match.');
                            case 4: return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, Officiating.create({
                                    user_id: user.id,
                                    match_id: match.id,
                                    status: 'pending'
                                }, { transaction: transaction })];
                            case 6:
                                isOfficiating = _a.sent();
                                _a.label = 7;
                            case 7:
                                if (!isOfficiating) {
                                    throw new Error('Referee was not assigned to match.');
                                }
                                SendGridService.sendEmail({
                                    to: user.email,
                                    from: 'admin@rentaref.com',
                                    subject: 'You have been assigned a match.',
                                    content: 'You have been assigned a new match. Go to your schedule to Accept or Decline.'
                                });
                                return [2 /*return*/, Promise.resolve('Referee was assigned to match')];
                        }
                    });
                }); };
                operateOnMatch(req, res, executeMethod);
                return [2 /*return*/];
            });
        });
    }
    function removeOfficialFromMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var match_id, user_id, message, transaction, match, user, officiate, isOfficiating, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        match_id = req.params.match_id;
                        user_id = req.params.user_id;
                        message = 'Referee was not removed from match : ' + match_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findById(match_id, { transaction: transaction })];
                    case 3:
                        match = _a.sent();
                        return [4 /*yield*/, User.findById(user_id, { transaction: transaction })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, Officiating.findOne({
                                where: {
                                    user_id: user_id,
                                    match_id: match_id
                                }
                            }, { transaction: transaction })];
                    case 5:
                        officiate = _a.sent();
                        if (!officiate) {
                            throw new Error('Referee is not officiating this match.');
                        }
                        if (!match) {
                            throw new Error('Match does not exist.');
                        }
                        return [4 /*yield*/, Officiating.destroy({
                                where: {
                                    user_id: user_id,
                                    match_id: match_id
                                }
                            }, { transaction: transaction })];
                    case 6:
                        isOfficiating = _a.sent();
                        if (!isOfficiating) {
                            throw new Error('Referee was not removed from match.');
                        }
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _a.sent();
                        ResponseService.success(res, 'Referee has been removed from match:' + match_id);
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, message);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function cancelMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, match_id, user_id, message, transaction, match_1, areCancelled, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = ResponseService.getItemFromBody(req);
                        match_id = body.match_id;
                        user_id = body.user_id;
                        message = 'Referee was not removed from match : ' + match_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findOne({
                                where: {
                                    id: match_id
                                },
                                include: [
                                    {
                                        model: User
                                    }
                                ]
                            }, { transaction: transaction })];
                    case 3:
                        match_1 = _a.sent();
                        if (!match_1) {
                            throw new Error('Match not found.');
                        }
                        if (!canAssignOrRemove(match_1.status)) {
                            throw new Error('A match can only be cancelled if it is pending or active.');
                        }
                        return [4 /*yield*/, Officiating.update({
                                status: 'cancelled'
                            }, {
                                where: {
                                    match_id: match_id
                                }
                            }, { transaction: transaction })];
                    case 4:
                        areCancelled = _a.sent();
                        if (!areCancelled) {
                            throw new Error('Failed to cancel match.');
                        }
                        return [4 /*yield*/, transaction.commit()];
                    case 5:
                        _a.sent();
                        match_1.user.forEach(function (user) {
                            SendGridService.sendEmail({
                                to: user.email,
                                from: 'admin@rentaref.com',
                                subject: 'Match Cancelled' + match_id,
                                content: 'The Administrator of Rent-A-Ref cancelled match: ' + match_1.id
                            });
                        });
                        ResponseService.success(res, 'Match cancelled and Referees have been removed from match:' + match_id);
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function declineMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var executeMethod;
            var _this = this;
            return __generator(this, function (_a) {
                executeMethod = function (user, match, officiate, transaction) { return __awaiter(_this, void 0, void 0, function () {
                    var isDeclined;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!officiate) {
                                    throw new Error('Referee is not officiating this match. ');
                                }
                                return [4 /*yield*/, adminTimeLockByPass(req, match)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, Officiating.update({
                                        status: 'declined'
                                    }, {
                                        where: {
                                            user_id: user.id,
                                            match_id: match.id
                                        }
                                    }, { transaction: transaction })];
                            case 2:
                                isDeclined = _a.sent();
                                if (!isDeclined) {
                                    throw new Error('Referee was not unassigned from match.');
                                }
                                SendGridService.sendEmail({
                                    to: user.email,
                                    from: 'admin@rentaref.com',
                                    subject: 'Match Declined.',
                                    content: 'You chose to decline match: ' + match.id
                                });
                                return [2 /*return*/, Promise.resolve('Referee declined to officiate match')];
                        }
                    });
                }); };
                operateOnMatch(req, res, executeMethod);
                return [2 /*return*/];
            });
        });
    }
    function acceptMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var executeMethod;
            var _this = this;
            return __generator(this, function (_a) {
                executeMethod = function (user, match, officiate, transaction) { return __awaiter(_this, void 0, void 0, function () {
                    var invitesAccepted, isAccepted;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!officiate) {
                                    throw new Error('Referee is not officiating this match. ');
                                }
                                return [4 /*yield*/, adminTimeLockByPass(req, match)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, Officiating.count({
                                        where: {
                                            match_id: match.id,
                                            status: 'accepted'
                                        }
                                    })];
                            case 2:
                                invitesAccepted = _a.sent();
                                if (invitesAccepted >= match.referees) {
                                    throw new Error('This match has a full set of referees');
                                }
                                return [4 /*yield*/, Officiating.update({
                                        status: 'accepted'
                                    }, {
                                        where: {
                                            user_id: user.id,
                                            match_id: match.id
                                        }
                                    }, { transaction: transaction })];
                            case 3:
                                isAccepted = _a.sent();
                                if (!isAccepted) {
                                    throw new Error('Match was not accepted.');
                                }
                                SendGridService.sendEmail({
                                    to: user.email,
                                    from: 'admin@rentaref.com',
                                    subject: 'Match Accepted.',
                                    content: 'You chose to accept match: ' + match.id
                                });
                                return [2 /*return*/, Promise.resolve('Referee accepted match')];
                        }
                    });
                }); };
                operateOnMatch(req, res, executeMethod);
                return [2 /*return*/];
            });
        });
    }
    function operateOnMatch(req, res, executeMethod) {
        return __awaiter(this, void 0, void 0, function () {
            var Address, body, match_id, user_id, transaction, match, user, officiate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Address = models.Address;
                        body = ResponseService.getItemFromBody(req);
                        match_id = body.match_id;
                        user_id = body.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findOne({
                                where: {
                                    id: match_id
                                },
                                include: [
                                    {
                                        model: Address
                                    }
                                ]
                            }, { transaction: transaction })];
                    case 3:
                        match = _a.sent();
                        return [4 /*yield*/, User.findById(user_id, { transaction: transaction })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, Officiating.findOne({
                                where: {
                                    user_id: user_id,
                                    match_id: match_id
                                }
                            }, { transaction: transaction })];
                    case 5:
                        officiate = _a.sent();
                        if (!match) {
                            throw new Error('Match does not exist.');
                        }
                        if (!canAssignOrRemove(match.status)) {
                            throw new Error('You can not be removed from this match.');
                        }
                        return [4 /*yield*/, executeMethod(user, match, officiate, transaction)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _a.sent();
                        ResponseService.success(res, 'Operation on match ' + match_id + ' was successful.');
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_2, 400);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    return {
        refereeSchedule: refereeSchedule,
        matchOfficials: matchOfficials,
        officialsByMatch: officialsByMatch,
        addOfficialToMatch: addOfficialToMatch,
        removeOfficialFromMatch: removeOfficialFromMatch,
        acceptMatch: acceptMatch,
        declineMatch: declineMatch,
        cancelMatch: cancelMatch
    };
}
exports.default = OfficiateController;
//# sourceMappingURL=officiateController.js.map
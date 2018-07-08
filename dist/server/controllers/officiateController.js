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
function OfficiateController(models, ResponseService, SendGridService) {
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
    function findUser(user_id, t) {
        return User.findById(user_id, {
            transaction: t
        });
    }
    function findMatch(match_id, t) {
        var Match = models.Match;
        return Match.findById(match_id, {
            transaction: t
        });
    }
    function findOfficiate(user_id, match_id, t) {
        var Officiating = models.Officiating;
        return Officiating.findOne({
            where: {
                user_id: user_id,
                match_id: match_id
            }
        }, {
            transaction: t
        });
    }
    function matchScheduleByUser(req, res) {
        var Officiating = models.Officiating;
        var Match = models.Match;
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign(clause, {
            where: {},
            include: [
                {
                    model: User,
                    where: {
                        id: req.params.user_id
                    },
                    through: {
                        attributes: ['id', 'email', 'can_referee', 'status']
                    }
                }
            ]
        });
        Match.findAndCountAll(whereClause)
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function officialsByMatch(req, res) {
        var Officiating = models.Officiating;
        var Match = models.Match;
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign(clause, {
            where: {},
            attributes: ['id', 'email', 'can_referee', 'status'],
            include: [
                {
                    model: Match,
                    where: {
                        id: req.params.match_id
                    },
                    through: {
                        attributes: ['id']
                    }
                }
            ]
        });
        User.findAndCountAll(whereClause)
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function createOfficiate(user_id, match_id, t) {
        var Officiating = models.Officiating;
        return Officiating.create({
            user_id: user_id,
            match_id: match_id
        }, {
            transaction: t
        });
    }
    function unassignOfficial(officiate_id, user_id, match_id, t) {
        var Officiating = models.Officiating;
        findMatch(match_id, t);
        return Officiating.destroy({
            where: {
                id: officiate_id
            }
        }, {
            transaction: t
        });
    }
    function addOfficialToMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, body, match_id, user_id, relation, transaction, match, user, officiate, isOfficiating, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        body = ResponseService.getItemFromBody(req);
                        match_id = body.match_id;
                        user_id = body.user_id;
                        relation = {
                            user_id: user_id,
                            match_id: match_id
                        };
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
                                where: relation
                            }, { transaction: transaction })];
                    case 5:
                        officiate = _a.sent();
                        if (officiate) {
                            throw new Error('Referee is already officiating this match.');
                        }
                        if (!match) {
                            throw new Error('Match does not exist.');
                        }
                        if (!user || user.can_referee != 'active') {
                            throw new Error('User is not an active referee.');
                        }
                        return [4 /*yield*/, Officiating.create(relation, { transaction: transaction })];
                    case 6:
                        isOfficiating = _a.sent();
                        if (isOfficiating) {
                            ResponseService.success(res, isOfficiating);
                        }
                        else {
                            throw new Error('User is not an active referee.');
                        }
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, 'Referee was not assigned to match.');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function removeOfficialFromMatch(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Match, body, match_id, user_id, canRemove, message, transaction, match, officiate, isOfficiating, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Match = sequelize.Match;
                        body = ResponseService.getItemFromBody(req);
                        match_id = body.match_id;
                        user_id = body.user_id;
                        canRemove = function (value) {
                            return value === 'pending' || value === 'none' || value === 'active';
                        };
                        message = 'Referee was not removed from match : ' + match_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Match.findById(match_id, { transaction: transaction })];
                    case 3:
                        match = _a.sent();
                        return [4 /*yield*/, Officiating.findOne({
                                where: {
                                    user_id: user_id,
                                    match_id: match_id
                                }
                            }, { transaction: transaction })];
                    case 4:
                        officiate = _a.sent();
                        if (officiate) {
                            throw new Error('Referee is not officiating this match.');
                        }
                        if (!match) {
                            throw new Error('Match does not exist.');
                        }
                        if (!canRemove(match.status)) {
                            throw new Error('You can not remove referee from this match.');
                        }
                        return [4 /*yield*/, Officiating.destroy({
                                where: {
                                    id: officiate.id
                                }
                            }, { transaction: transaction })];
                    case 5:
                        isOfficiating = _a.sent();
                        if (isOfficiating) {
                            ResponseService.success(res, 'Referee has been removed from match:' + match_id);
                        }
                        else {
                            throw new Error('User is not an active referee.');
                        }
                        return [4 /*yield*/, transaction.commit()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    return {
        matchScheduleByUser: matchScheduleByUser,
        addOfficialToMatch: addOfficialToMatch,
        removeOfficialFromMatch: removeOfficialFromMatch
    };
}
exports.default = OfficiateController;
//# sourceMappingURL=officiateController.js.map
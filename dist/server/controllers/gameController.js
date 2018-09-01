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
function GameController(models, ResponseService) {
    var Game = models.Game;
    var attributes = [
        'id',
        'event_name',
        'start_date',
        'end_date',
        'event_type',
        'venue_name',
        'status',
        'kids_referees',
        'teens_referees',
        'adults_referees',
        'kids_refs_pay',
        'teens_refs_pay',
        'adults_refs_pay'
    ];
    function returnGame(res, game, status) {
        if (status === void 0) { status = 200; }
        var newGame = ResponseService.deleteItemDates(game);
        newGame.id = game.id;
        ResponseService.success(res, newGame, status);
    }
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Game.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getAllByOrganization(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign(clause.where, {
            organization_id: req.params.organization_id
        });
        clause.where = whereClause;
        Game.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        var Address = models.Address;
        var Phone = models.Phone;
        Game.find({
            where: {
                id: req.params.game_id
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
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var game = ResponseService.getItemFromBody(req);
        Game.create(game)
            .then(function (newGame) {
            returnGame(res, newGame, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var game = ResponseService.getItemFromBody(req);
        Game.update(game, {
            where: {
                id: req.params.game_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Game updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var game_id = req.params.game_id;
        function doDelete(game) {
            return Game.destroy({
                where: {
                    id: game.id
                }
            });
        }
        ResponseService.findObject(game_id, 'Game', res, doDelete, 204);
    }
    function addTimeToDate(time, date) {
        return ResponseService.addTimeToDate(time, date);
    }
    function calculateDate(date, timezone_id) {
        return ResponseService.calculateDate(date, timezone_id);
    }
    function fixTime(timezone_id, date, time) {
        return calculateDate(addTimeToDate(time, date), timezone_id);
    }
    function processTime(game, timeZone) {
        var timeFixer = _.partial(fixTime, game.timezone_id);
        game.start_date = timeFixer(game.start_date, game.start_time);
        game.end_date = timeFixer(game.end_date, game.end_time);
    }
    function createGameAddressPhone(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Address, Phone, game, address, phone, transaction, newGame, newAddress, newPhone, timeZone, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Address = models.Address;
                        Phone = models.Phone;
                        game = ResponseService.getItemFromBody(req);
                        address = ResponseService.deleteItemDates(game.address);
                        phone = ResponseService.deleteItemDates(game.phone);
                        delete game.address_id;
                        delete game.phone_id;
                        delete game.address;
                        delete game.phone;
                        game.organization_id = req.params.organization_id;
                        game.status = 'pending';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, ResponseService.workoutTimeZone(game, address)];
                    case 3:
                        timeZone = _a.sent();
                        ResponseService.setTimeZone(game, timeZone.googleTimeZone);
                        address.lat = timeZone.location.lat;
                        address.lng = timeZone.location.lng;
                        processTime(game, timeZone);
                        return [4 /*yield*/, Address.create(address, { transaction: transaction })];
                    case 4:
                        newAddress = _a.sent();
                        game.address_id = newAddress.id;
                        if (!phone) return [3 /*break*/, 6];
                        return [4 /*yield*/, Phone.create(phone, { transaction: transaction })];
                    case 5:
                        newPhone = _a.sent();
                        game.phone_id = newPhone.id;
                        _a.label = 6;
                    case 6: return [4 /*yield*/, Game.create(game, { transaction: transaction })];
                    case 7:
                        newGame = _a.sent();
                        transaction.commit();
                        ResponseService.success(res, newGame, 201);
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function getGameAddress(req, res) {
        this.getOne(req, res);
    }
    function updateGameAddress(req, res) {
        var Address = models.Address;
        var address = ResponseService.deleteItemDates(req);
        Game.find({
            where: {
                id: req.params.game_id
            }
        })
            .then(function (game) {
            return Address.update(address, {
                where: {
                    id: req.params.address_id
                }
            });
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteGameAddress(req, res) { }
    function getPrices(req, res) {
        var sequelize = models.sequelize;
        var Price = models.Price;
        Price.findAll()
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getAllByOrganization: getAllByOrganization,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getPrices: getPrices,
        getGameAddress: getGameAddress,
        createGameAddressPhone: createGameAddressPhone,
        updateGameAddress: updateGameAddress,
        deleteGameAddress: deleteGameAddress
    };
}
exports.default = GameController;
//# sourceMappingURL=gameController.js.map
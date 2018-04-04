"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function GameController(models, ResponseService) {
    var Game = models.Game;
    var attributes = ['id', 'name', 'duration', 'referees', 'pay', 'ages'];
    function makeGame(game) {
        return {
            name: game.name,
            duration: game.duration,
            referees: game.referees,
            ages: game.ages,
            pay: game.pay
        };
    }
    function returnGame(res, game, status) {
        if (status === void 0) { status = 200; }
        var newGame = makeGame(game);
        newGame.id = game.id;
        ResponseService.success(res, newGame, status);
    }
    function getAll(req, res) {
        Game.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        var Address = models.Address;
        var Phone = models.Phone;
        Game.findAll({
            where: {
                id: req.params.game_id
            },
            include: [{
                    model: Address
                }, {
                    model: Phone
                }]
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var game = makeGame(req.body);
        Game.create(game)
            .then(function (newGame) {
            returnGame(res, newGame, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var game = makeGame(req.body);
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
    function createGameAddressPhone(req, res) {
        var _this = this;
        var sequelize = models.sequelize;
        var Address = models.Address;
        var Phone = models.Phone;
        var game = ResponseService.getItemFromBody(req);
        var address = _.cloneDeep(game.address);
        var phone = _.cloneDeep(game.phone);
        delete game.address;
        delete game.phone;
        game.organization_id = req.params.organization_id;
        sequelize.transaction(function (t) {
            return Address.create(address, { transaction: t })
                .then(function (newAddress) {
                game.address_id = newAddress.id;
                return Phone.create(phone, { transaction: t });
            })
                .then(function (newPhone) {
                game.phone_id = newPhone.id;
                return Game.create(game, { transaction: t });
            });
        })
            .then(function (result) {
            var aGame = ResponseService.deleteItemDates(result);
            ResponseService.success(res, aGame, 201);
        })
            .catch(function (error) { return _this.exception(res, error); });
    }
    function getGameAddress(req, res) {
        this.getOne(req, res);
    }
    function updateGameAddress(req, res) { }
    function deleteGameAddress(req, res) { }
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getGameAddress: getGameAddress,
        createGameAddressPhone: createGameAddressPhone,
        updateGameAddress: updateGameAddress,
        deleteGameAddress: deleteGameAddress
    };
}
exports.default = GameController;
//# sourceMappingURL=gameController.js.map
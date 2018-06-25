"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GameController(models, ResponseService) {
    var Game = models.Game;
    var attributes = [
        'id',
        'event_name',
        'event_date',
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
        var whereClause = Object.assign(clause, {
            where: {
                organization_id: req.params.organization_id
            }
        });
        Game.findAndCountAll(whereClause)
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
    function createGameAddressPhone(req, res) {
        var _this = this;
        var sequelize = models.sequelize;
        var Address = models.Address;
        var Phone = models.Phone;
        var createGame = function (t, game) {
            return Game.create(game, { transaction: t });
        };
        var createPhone = function (t, phone, game) {
            return Phone.create(phone, { transaction: t }).then(function (newPhone) {
                game.phone_id = newPhone.id;
                return createGame(t, game);
            });
        };
        var game = ResponseService.getItemFromBody(req);
        var address = ResponseService.deleteItemDates(game.address);
        var phone = ResponseService.deleteItemDates(game.phone);
        delete game.address_id;
        delete game.phone_id;
        delete game.address;
        delete game.phone;
        game.organization_id = req.params.organization_id;
        game.status = 'pending';
        sequelize
            .transaction(function (t) {
            return Address.create(address, { transaction: t }).then(function (newAddress) {
                game.address_id = newAddress.id;
                return phone ? createPhone(t, phone, game) : createGame(t, game);
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
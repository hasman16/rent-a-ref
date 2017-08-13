"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GameController(models, ResponseService) {
    var Game = models.Game;
    var attributes = ['id', 'name', 'duration', 'referees'];
    function makeGame(newGame) {
        var game = {
            "name": newGame["name"],
            "duration": newGame['duration'],
            "referees": newGame['referees']
        };
        return game;
    }
    function returnGame(res, game, status) {
        if (status === void 0) { status = 200; }
        var newGame = makeGame(game);
        newGame["id"] = game.id;
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
        Game.findOne({
            where: {
                id: req.params.game_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
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
        var game = makeGame(req.body);
        Game.destroy(game)
            .then(function (result) { return ResponseService.success(res, 'Game deleted', 204); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = GameController;
//# sourceMappingURL=gameController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GameController(models, ResponseService) {
    var Game = models.Game;
    var attributes = ['id', 'name', 'duration', 'referees'];
    function makeGame(newGame, withId) {
        if (withId === void 0) { withId = false; }
        var game = {
            "name": newGame["name"],
            "duration": newGame['duration'],
            "referees": newGame['referees']
        };
        if (withId) {
            game['id'] = newGame.id;
        }
        return game;
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
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var game = makeGame(req.body, false);
        Game.create(game)
            .then(function (newGame) {
            ResponseService.success(res, makeGame(newGame, true));
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var game = makeGame(req.body, false);
        Game.update(game, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Game updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var game = makeGame(req.body, false);
        Game.destroy(game)
            .then(function (result) { return ResponseService.success(res, 'Game deleted'); })
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
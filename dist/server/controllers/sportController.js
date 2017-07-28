"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SportController(models, ResponseService) {
    var Sport = models.Sport;
    var attributes = ['id', 'name', 'periods', 'duration', 'referees'];
    // Get all
    function getAll(req, res) {
        Sport.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Sport.findOne({
            where: {
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var sport = makeSport(req.body, false);
        Sport.create(sport)
            .then(function (newSport) {
            returnSport(res, newSport);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makeSport(sport, idOk) {
        var newSport = {
            name: String(sport.name).trim(),
            duration: Number(sport.duration),
            referees: Number(sport.referees),
            periods: Number(sport.periods)
        };
        if (idOk) {
            newSport['id'] = sport.id;
        }
        return newSport;
    }
    function returnSport(res, sport) {
        ResponseService.success(res, makeSport(sport, true));
    }
    function updateOne(req, res) {
        var sport = makeSport(req.body, false);
        Sport.update(sport, {
            where: {
                id: req.params.id
            }
        })
            .then(function (newSport) { return getOne(req, res); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        function totalLines(lines1, lines2) {
            return Number(lines1[0]) + Number(lines2[2]);
        }
        var sequelize = models.sequelize;
        var Referee = models.Referee;
        var clause = {
            where: {
                id: req.params.id
            }
        };
        sequelize.transaction(function (t) {
            return Sport.destroy(clause, { transaction: t })
                .then(function (lines1) {
                return Referee.destroy(clause, { transaction: t })
                    .then(function (lines2) { return ResponseService.success(res, "Sport and Referees deleted:", totalLines(lines1, lines2)); });
            });
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        updateOne: updateOne,
        deleteOne: deleteOne
    };
}
exports.default = SportController;
//# sourceMappingURL=sportController.js.map
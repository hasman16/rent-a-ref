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
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Sport.findOne({
            where: {
                id: req.params.sport_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var sport = makeSport(req.body);
        Sport.create(sport)
            .then(function (newSport) {
            returnSport(res, newSport, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makeSport(sport) {
        var newSport = {
            name: String(sport.name).trim(),
            duration: Number(sport.duration),
            referees: Number(sport.referees),
            periods: Number(sport.periods)
        };
        return newSport;
    }
    function returnSport(res, sport, status) {
        if (status === void 0) { status = 200; }
        var newSport = makeSport(sport);
        newSport["id"] = sport.id;
        ResponseService.success(res, newSport, status);
    }
    function updateOne(req, res) {
        var sport = makeSport(req.body);
        Sport.update(sport, {
            where: {
                id: req.params.sport_id
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
                id: req.params.sport_id
            }
        };
        sequelize.transaction(function (t) {
            return Sport.destroy(clause, { transaction: t })
                .then(function (lines1) {
                return Referee.destroy(clause, { transaction: t })
                    .then(function (lines2) { return ResponseService.success(res, "Sport and Referees deleted:", totalLines(lines1, lines2), 204); });
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
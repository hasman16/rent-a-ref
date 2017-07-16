export default function SportController(models, ResponseService) {
  const Sport = models.Sport;
  const attributes = ['id', 'name', 'duration', 'referees']

  // Get all
  function getAll(req, res) {
    Sport.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Sport.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    function callback() {
      const sport = makeSport(req.body, false);
      Sport.create(sport)
        .then(newSport => {
          returnSport(res, newSport);
        })
        .catch(error => ResponseService.exception(res, error));
    }
    executeAsAdmin(req, res, callback);
  }

  function makeSport(sport, idOk) {
    let newSport = {
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
    ResponseService.success(res, makeSport(sport,true));
  }

  function executeAsAdmin(req, res, callback) {
    const authorization = req.decoded.accessLevel;
    if (authorization === 1 || authorization === 2) {
      callback();
    } else {
      ResponseService.failure(res, "Permissions violation.");
    }
  }

  function updateOne(req, res) {
    function callback() {
      const sport = makeSport(req.body, false);

      Sport.update(sport, {
        where: {
          id: req.params.id
        }
      })
        .then(newSport => getOne(req, res))
        .catch(error => ResponseService.exception(res, error));
    }
    executeAsAdmin(req, res, callback);
  }

  function deleteOne(req, res) {
    function totalLines(lines1, lines2) {
      return Number(lines1[0]) + Number(lines2[2]);
    }

    function callback() {
      const sequelize = models.sequelize;
      const Referee = models.Referee;
      const clause = {
        where: {
          id: req.params.id
        }
      };

      sequelize.transaction(function(t) {
        return Sport.destroy(clause, { transaction: t })
          .then(lines1 => {
            return Referee.destroy(clause, { transaction: t })
              .then(lines2 => ResponseService.success(res, "Sport and Referees deleted:", totalLines(lines1, lines2)));
          });
      })
        .catch(error => ResponseService.exception(res, error));
    }
    executeAsAdmin(req, res, callback);
  }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    updateOne: updateOne,
    deleteOne: deleteOne
  }
}

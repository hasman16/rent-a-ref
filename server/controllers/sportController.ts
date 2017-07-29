export default function SportController(models, ResponseService) {
  const Sport = models.Sport;
  const attributes = ['id', 'name', 'periods', 'duration', 'referees'];

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
        id: req.params.sport_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const sport = makeSport(req.body);
    Sport.create(sport)
      .then(newSport => {
        returnSport(res, newSport);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function makeSport(sport) {
    let newSport = {
      name: String(sport.name).trim(),
      duration: Number(sport.duration),
      referees: Number(sport.referees),
      periods: Number(sport.periods)
    };

    return newSport;
  }

  function returnSport(res, sport) {
    let newSport = makeSport(sport);
    newSport["id"] = sport.id;
    ResponseService.success(res, newSport);
  }

  function updateOne(req, res) {
    const sport = makeSport(req.body);

    Sport.update(sport, {
      where: {
        id: req.params.sport_id
      }
    })
      .then(newSport => getOne(req, res))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    function totalLines(lines1, lines2) {
      return Number(lines1[0]) + Number(lines2[2]);
    }

    const sequelize = models.sequelize;
    const Referee = models.Referee;
    const clause = {
      where: {
        id: req.params.sport_id
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

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    updateOne: updateOne,
    deleteOne: deleteOne
  }
}

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
    Sport.findAll({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const sport = new Object(req.body);
    Sport.create(sport)
      .then(newSport => {
        ResponseService.success(res, newSport);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const sport = new Object(req.body);
    Sport.update(sport, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Sport updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const sport = new Object(req.body);
    Sport.destroy(sport)
      .then(result => ResponseService.success(res, 'Sport deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  }
}

export default function GameController(models, ResponseService) {
  const Game = models.Game;
  const attributes = ['id', 'name', 'duration', 'referees']

  // Get all
  function getAll(req, res) {
    Game.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Game.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const game = new Object(req.body);
    Game.create(game)
      .then(newGame => {
        ResponseService.success(res, newGame);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const game = new Object(req.body);
    Game.update(game, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Game updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const game = new Object(req.body);
    Game.destroy(game)
      .then(result => ResponseService.success(res, 'Game deleted'))
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

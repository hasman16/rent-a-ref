import { IGame } from './../types/index';

export default function GameController(models, ResponseService) {
  const Game = models.Game;
  const attributes = ['id', 'name', 'duration', 'referees'];

  function makeGame(game: IGame): IGame {
    return <IGame>{
      name: game.name,
      duration: game.duration,
      referees: game.referees,
      type: game.type,
      age: game.age,
      pay: game.pay
    };
  }

  function returnGame(res, game, status = 200) {
    let newGame: IGame = makeGame(game);
    newGame.id = game.id;
    ResponseService.success(res, newGame, status);
  }

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
        id: req.params.game_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const game: IGame = makeGame(req.body);

    Game.create(game)
      .then(newGame => {
        returnGame(res, newGame, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const game: IGame = makeGame(req.body);

    Game.update(game, {
      where: {
        id: req.params.game_id
      }
    })
      .then(result => ResponseService.success(res, 'Game updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const game_id = req.params.game_id;

    function doDelete(game) {
      return Game.destroy({
        where: {
          id: game.id
        }
      });
    }

    ResponseService.findObject(game_id, 'Game', res, doDelete, 204);
  }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  };
}

import { AddressModel, GameModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';

export default function GameController(models, ResponseService) {
  const Game = models.Game;
  const attributes = ['id', 'name', 'duration', 'referees', 'pay', 'ages'];

  function makeGame(game: GameModel): GameModel {
    return <GameModel>{
      name: game.name,
      duration: game.duration,
      referees: game.referees,
      ages: game.ages,
      pay: game.pay
    };
  }

  function returnGame(res, game, status = 200) {
    let newGame: GameModel = makeGame(game);
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
    const Address = models.Address;
    const Phone = models.Phone;

    Game.findAll({
      where: {
        id: req.params.game_id
      },

      include: [{
        model: Address
      },{
        model: Phone
      }]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const game: GameModel = makeGame(req.body);

    Game.create(game)
      .then(newGame => {
        returnGame(res, newGame, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const game: GameModel = makeGame(req.body);

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

  function createGameAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;

    let game: GameModel = <GameModel>ResponseService.getItemFromBody(req);
    let address: AddressModel = _.cloneDeep(game.address);
    let phone: PhoneModel = _.cloneDeep(game.phone);

    delete game.address;
    delete game.phone;
    game.organization_id = req.params.organization_id;

    sequelize.transaction((t) => {
      return Address.create(address, { transaction: t })
        .then((newAddress) => {
          game.address_id = newAddress.id;
          return Phone.create(phone, { transaction: t });
        })
        .then((newPhone) => {
          game.phone_id = newPhone.id;
          return Game.create(game, { transaction: t });
        });     
    })
    .then(result => {
      let aGame = ResponseService.deleteItemDates(result);
      ResponseService.success(res, aGame, 201);
    })
    .catch(error => this.exception(res, error));
  }

  function getGameAddress(req, res) {
    this.getOne(req, res);
  }

  function updateGameAddress(req, res) { }
  function deleteGameAddress(req, res) { }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne,

    getGameAddress,
    createGameAddressPhone,
    updateGameAddress,
    deleteGameAddress
  };
}

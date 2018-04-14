import { AddressModel, GameModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';

export default function GameController(models, ResponseService) {
  const Game = models.Game;
  const attributes = [
    'id',
    'event_name',
    'event_date',
    'event_type',
    'venue_name',
    'status',
    'kids_referees',
    'teens_referees',
    'adults_referees',
    'kids_refs_pay',
    'teens_refs_pay',
    'adults_refs_pay'
  ];

  function returnGame(res, game, status = 200) {
    let newGame: GameModel = <GameModel>ResponseService.deleteItemDates(game);
    newGame.id = game.id;
    ResponseService.success(res, newGame, status);
  }

  function getAll(req, res) {
    console.log('getAll games');
    Game.findAll()
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getAllByOrganization(req, res) {
    Game.findAll({
      where: {
        organization_id: req.params.organization_id
      }
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    const Address = models.Address;
    const Phone = models.Phone;

    Game.find({
      where: {
        id: req.params.game_id
      },
      include: [
        {
          model: Address
        },
        {
          model: Phone
        }
      ]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const game: GameModel = <GameModel>ResponseService.getItemFromBody(req);

    Game.create(game)
      .then(newGame => {
        returnGame(res, newGame, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const game: GameModel = <GameModel>ResponseService.getItemFromBody(req);

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
    const createGame = (t, game) => {
      return Game.create(game, { transaction: t });
    };
    const createPhone = (t, phone, game) => {
      return Phone.create(phone, { transaction: t }).then(newPhone => {
        game.phone_id = newPhone.id;
        return createGame(t, game);
      });
    };
    let game: GameModel = <GameModel>ResponseService.getItemFromBody(req);
    const address: AddressModel = ResponseService.deleteItemDates(game.address);
    const phone: PhoneModel = ResponseService.deleteItemDates(game.phone);

    delete game.address_id;
    delete game.phone_id;
    delete game.address;
    delete game.phone;

    game.organization_id = req.params.organization_id;
    game.status = 'pending';

    sequelize
      .transaction(t => {
        return Address.create(address, { transaction: t }).then(newAddress => {
          game.address_id = newAddress.id;
          return phone ? createPhone(t, phone, game) : createGame(t, game);
        });
      })
      .then(result => {
        const aGame = ResponseService.deleteItemDates(result);
        ResponseService.success(res, aGame, 201);
      })
      .catch(error => this.exception(res, error));
  }

  function getGameAddress(req, res) {
    this.getOne(req, res);
  }

  function updateGameAddress(req, res) {}
  function deleteGameAddress(req, res) {}

  return {
    getAll,
    getAllByOrganization,
    getOne,
    create,
    update,
    deleteOne,

    getGameAddress,
    createGameAddressPhone,
    updateGameAddress,
    deleteGameAddress
  };
}

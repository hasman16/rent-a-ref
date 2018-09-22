import { AddressModel, GameModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';

export default function GameController(models, ResponseService) {
  const Game = models.Game;
  const attributes = [
    'id',
    'event_name',
    'start_date',
    'end_date',
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
    const clause = ResponseService.produceSearchAndSortClause(req);

    Game.findAndCountAll(clause)
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getAllByOrganization(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause.where, {
      organization_id: req.params.organization_id
    });
    clause.where = whereClause;

    Game.findAndCountAll(clause)
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

  async function deleteOne(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    const Match = models.Match;
    const game_id = req.params.game_id;
    const whereClause = {
      where: {
        game: game_id
      },
      include: [
        {
          model: Address
        },
        {
          model: Phone
        },
        {
          model: Match
        }
      ]
    };
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const result = await Game.findOne(whereClause, {
        transaction
      });
      if (result) {
        throw new Error('Game does not exist.');
      }

      const matches: any[] = result.matches;
      const address = result.address;
      const phone = result.phones;

      if (address) {
        await Address.destroy({
          where: {
            id: address.id
          }
        });
      }
      if (phone) {
        await Phone.destroy({
          where: {
            id: phone.id
          }
        });
      }

      await Game.destroy({
        where: {
          id: game_id
        }
      });
      await transaction.commit();

      ResponseService.success(res, {
        success: true,
        message: 'Event deleted'
      });
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 400);
    }
  }

  function addTimeToDate(time, date) {
    return ResponseService.addTimeToDate(time, date);
  }

  function calculateDate(date, timezone_id) {
    return ResponseService.calculateDate(date, timezone_id);
  }

  function fixTime(timezone_id, date, time) {
    return calculateDate(addTimeToDate(time, date), timezone_id);
  }

  function processTime(game, timeZone) {
    const timeFixer = _.partial(fixTime, game.timezone_id);

    game.start_date = timeFixer(game.start_date, game.start_time);
    game.end_date = timeFixer(game.end_date, game.end_time);
  }

  async function createGameAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    let game: GameModel = <GameModel>ResponseService.getItemFromBody(req);
    const address: AddressModel = ResponseService.deleteItemDates(game.address);
    const phone: PhoneModel = ResponseService.deleteItemDates(game.phone);

    delete game.address_id;
    delete game.phone_id;
    delete game.address;
    delete game.phone;

    game.organization_id = req.params.organization_id;
    game.status = 'pending';

    let transaction, newGame, newAddress, newPhone;
    try {
      transaction = await sequelize.transaction();

      let timeZone = await ResponseService.workoutTimeZone(address);
      ResponseService.setTimeZone(game, timeZone.googleTimeZone);

      address.lat = timeZone.location.lat;
      address.lng = timeZone.location.lng;

      processTime(game, timeZone);

      newAddress = await Address.create(address, { transaction });
      game.address_id = newAddress.id;
      if (phone) {
        newPhone = await Phone.create(phone, { transaction });
        game.phone_id = newPhone.id;
      }
      newGame = await Game.create(game, { transaction });
      transaction.commit();
      ResponseService.success(res, newGame, 201);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  function getGameAddress(req, res) {
    this.getOne(req, res);
  }

  function updateGameAddress(req, res) {
    const Address = models.Address;
    const address: AddressModel = ResponseService.deleteItemDates(req);

    Game.find({
      where: {
        id: req.params.game_id
      }
    })
      .then(game => {
        return Address.update(address, {
          where: {
            id: req.params.address_id
          }
        });
      })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteGameAddress(req, res) {}

  function getPrices(req, res) {
    const sequelize = models.sequelize;
    const Price = models.Price;
    Price.findAll()
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll,
    getAllByOrganization,
    getOne,
    create,
    update,
    deleteOne,
    getPrices,
    getGameAddress,
    createGameAddressPhone,
    updateGameAddress,
    deleteGameAddress
  };
}

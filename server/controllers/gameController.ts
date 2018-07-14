import { AddressModel, GameModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';
import * as moment from 'moment';

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
      const testAddress = await ResponseService.getAddress(address);
      const geometry = _.get(testAddress, 'results[0].geometry', null);
      if (!geometry) {
        throw new Error('Error searching for address.');
      }
      const location = geometry.location;
      const testTimeZone = await ResponseService.getTimezone([
        location.lat,
        location.lng
      ]);
      if (!testTimeZone) {
        throw new Error('Error searching for timezone.');
      }

      game.timezone_name = testTimeZone.timeZoneName;
      game.timezone = 1000 * (testTimeZone.rawOffset + testTimeZone.dstOffset);
      game.event_date = game.event_date - game.timezone;

      //game.event_date = moment(game.event_date, game.timezone_name).date();

      newAddress = Address.create(address, { transaction });
      game.address_id = newAddress.id;
      if (phone) {
        newPhone = await Phone.create(phone, { transaction });
        game.phone_id = newPhone.id;
      }
      newGame = await Game.create(game, { transaction });
      transaction.commit();
      ResponseService.success(res, newGame, 201);
    } catch (error) {
      console.log('error:', error);
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

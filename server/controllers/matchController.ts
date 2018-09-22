import { AddressModel, MatchModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';

export default function MatchController(models, ResponseService) {
  const sequelize = models.sequelize;

  const Match = models.Match;
  const Address = models.Address;
  const attributes = ['id'];

  function returnMatch(res, match, status = 200) {
    let newMatch: MatchModel = <MatchModel>ResponseService.deleteItemDates(
      match
    );
    newMatch.id = match.id;
    ResponseService.success(res, newMatch, status);
  }

  function getAll(req, res) {
    const clause = ResponseService.produceSearchAndSortClause(req);

    Match.findAndCountAll(clause)
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getAllByGame(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const User = models.User;
    const whereClause = Object.assign(
      {
        where: {
          game_id: req.params.game_id
        },
        include: [
          {
            model: User,
            attributes: ['id', 'email'],
            through: {}
          }
        ]
      },
      clause
    );

    Match.findAndCountAll(whereClause)
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    const Address = models.Address;
    const Phone = models.Phone;
    Match.findOne({
      where: {
        id: req.params.match_id
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
      .then(results => {
        ResponseService.success(res, results);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);

    Match.create(match)
      .then(newMatch => {
        returnMatch(res, newMatch, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function canAssignOrRemove(value): boolean {
    return value === 'pending' || value === 'none' || value === 'active';
  }

  function processTime(match, timeZome) {
    match.date = ResponseService.addTimeToDate(match.time, match.date);
    match.date = ResponseService.calculateDate(match.date, match.timezone_id);
  }

  async function update(req, res) {
    let match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);
    const sequelize = models.sequelize;
    const Officiating = models.Officiating;
    const match_id = req.params.match_id;
    const Address = models.Address;
    const Phone = models.Phone;
    let address: AddressModel = ResponseService.deleteItemDates(match.address);
    const phone: PhoneModel = ResponseService.deleteItemDates(match.phone);
    const relation = {
      where: {
        id: match_id
      }
    };
    match = ResponseService.deleteItemDates(match);
    delete match.id;
    delete match.address_id;
    delete match.phone_id;
    delete match.address;
    delete match.phone;

    let transaction, oldMatch, newMatch, oldAddress, oldPhone;

    try {
      transaction = await sequelize.transaction();
      oldMatch = await Match.findById(match_id, {
        transaction
      });
      if (oldMatch && canAssignOrRemove(oldMatch.status)) {
        await isOrgMemberOrAdmin(req, oldMatch.game_id);

        if (phone) {
          oldPhone = await Phone.findById(oldMatch.phone_id, {
            transaction
          });
          match.phone_id = oldPhone.id;
          if (oldPhone) {
            await Phone.update(
              phone,
              {
                where: { id: oldPhone.id }
              },
              { transaction }
            );
          }
        }

        if (address) {
          let timeZone = await ResponseService.workoutTimeZone(address);
          ResponseService.setTimeZone(match, timeZone.googleTimeZone);

          address.lat = timeZone.location.lat;
          address.lng = timeZone.location.lng;
          processTime(match, timeZone);

          oldAddress = await Address.findById(oldMatch.address_id, {
            transaction
          });
          if (oldAddress) {
            match.address_id = oldAddress.id;

            await Address.update(
              address,
              {
                where: {
                  id: oldAddress.id
                }
              },
              {
                transaction
              }
            );
          }
        } else {
          match.date = oldMatch.date;
          delete match.timezone_id;
          delete match.timezone_name;
          delete match.timezone;
          delete match.timezone_offset;
        }
      } else {
        throw new Error('Cannot update match.');
      }
      const newMatch = await Match.update(match, relation, {
        transaction
      });
      transaction.commit();
      ResponseService.success(res, 'Match updated', 200);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 404);
    }
  }

  async function deleteOne(req, res) {
    const sequelize = models.sequelize;
    const Officiating = models.Officiating;
    const match_id = req.params.match_id;
    const relation = {
      where: {
        id: match_id
      }
    };

    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findById(match_id, {
        transaction
      });

      if (!match) {
        throw new Error('Match not found.');
      }
      await Match.destroy(relation, {
        transaction
      });
      let officiate = await Officiating.findOne(relation, {
        transaction
      });
      if (officiate) {
        await Officiating.destroy(relation, {
          transaction
        });
      }
      transaction.commit();
      ResponseService.success(
        res,
        'Match and Referee assignments deleted.',
        204
      );
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 404);
    }
  }

  async function createMatchAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    let match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);
    let address: AddressModel = ResponseService.deleteItemDates(match.address);
    const phone: PhoneModel = ResponseService.deleteItemDates(match.phone);

    delete match.address_id;
    delete match.phone_id;
    delete match.address;
    delete match.phone;

    match.game_id = req.params.game_id;
    match.status = 'pending';
    let transaction, newMatch, newAddress, newPhone;

    try {
      transaction = await sequelize.transaction();
      await isOrgMemberOrAdmin(req, match.game_id);

      if (address) {
        let timeZone = await ResponseService.workoutTimeZone(address);
        ResponseService.setTimeZone(match, timeZone.googleTimeZone);

        address.lat = timeZone.location.lat;
        address.lng = timeZone.location.lng;
        processTime(match, timeZone);

        newAddress = await Address.create(address, { transaction });
        match.address_id = newAddress.id;
      } else {
        delete match.date;
      }

      if (phone) {
        newPhone = await Phone.create(phone, { transaction });
        match.phone_id = newPhone.id;
      }
      newMatch = await Match.create(match, { transaction });

      transaction.commit();

      const aMatch = ResponseService.deleteItemDates(newMatch);
      ResponseService.success(res, aMatch, 201);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  function getMatchAddress(req, res) {
    this.getOne(req, res);
  }

  function updateMatchAddress(req, res) {}
  function deleteMatchAddress(req, res) {}

  async function isOrgMemberOrAdmin(req, game_id) {
    if (ResponseService.isAdmin(req)) {
      return {
        success: true,
        message: 'Is Admin'
      };
    } else {
      const sequelize = models.sequelize;
      const Game = models.Game;
      const Organizer = models.Organizer;
      const game = await Game.findById(game_id);

      const whereClause = {
        user_id: req.decoded.id,
        organization_id: game.organization_id
      };
      const result = await Organizer.findOne(whereClause);
      if (result) {
        return {
          success: true,
          message: 'Event is before lock time'
        };
      } else {
        throw new Error('Event is now locked');
      }
    }
  }

  return {
    getAll,
    getAllByGame,
    getOne,
    create,
    update,
    deleteOne,
    getMatchAddress,
    createMatchAddressPhone,
    updateMatchAddress,
    deleteMatchAddress
  };
}

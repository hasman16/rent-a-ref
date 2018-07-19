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
    const whereClause = Object.assign(clause, {
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
    });

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

  async function update(req, res) {
    const match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);
    const sequelize = models.sequelize;
    const Officiating = models.Officiating;
    const match_id = req.params.match_id;
    const relation = {
      where: {
        id: match_id
      }
    };

    let transaction, oldMatch;

    try {
      transaction = await sequelize.transaction();
      oldMatch = await Match.findOne(
        {
          where: {
            id: match_id
          },
          include: [
            {
              model: Address
            }
          ]
        },
        {
          transaction
        }
      );

      if (oldMatch && canAssignOrRemove(oldMatch.status)) {
        await Match.update(match, {
          transaction
        });
      } else {
        throw new Error('Cannot update match.');
      }
      transaction.commit();
      ResponseService.success(res, 'Match updated', 200);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
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
        throw new Error('');
      }
      await Match.destroy(relation, {
        transaction
      });
      let officiate = await Officiating.findOne(relation, {
        transaction
      });
      if (officiate) {
        await Officiating.destroy(
          relation,
          {
            transaction
          },
          {
            transaction
          }
        );
      }
      transaction.commit();
      ResponseService.success(
        res,
        'Match and Referee assignments deleted',
        204
      );
    } catch (error) {
      transaction.rollback(transaction);
      //ResponseService.exception(res, 'Match was not deleted.', 404);
      ResponseService.exception(res, error, 404);
    }
  }

  async function createMatchAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    let match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);
    const address: AddressModel = ResponseService.deleteItemDates(
      match.address
    );
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
      let dateTime: string = match.date + 'T' + match.time;
      match.date = dateTime.replace(/z/i, '');
      await ResponseService.workoutTimeZone(match, address);

      if (address) {
        newAddress = await Address.create(address, { transaction });
        match.address_id = newAddress.id;
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

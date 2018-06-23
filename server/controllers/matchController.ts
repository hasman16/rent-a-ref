import { AddressModel, MatchModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';

export default function MatchController(models, ResponseService) {
  const Match = models.Match;
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

  function getAllByMatch(req, res) {
    Match.findAll({
      where: {
        game_id: req.params.game_id
      }
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    const Address = models.Address;
    const Phone = models.Phone;

    Match.find({
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
      .then(results => ResponseService.success(res, results))
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

  function update(req, res) {
    const match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);

    Match.update(match, {
      where: {
        id: req.params.match_id
      }
    })
      .then(result => ResponseService.success(res, 'Match updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const match_id = req.params.match_id;

    function doDelete(match) {
      return Match.destroy({
        where: {
          id: match.id
        }
      });
    }

    ResponseService.findObject(match_id, 'Match', res, doDelete, 204);
  }

  function createMatchAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    const createMatch = (t, match) => {
      return Match.create(match, { transaction: t });
    };
    const createPhone = (t, phone, match) => {
      return Phone.create(phone, { transaction: t }).then(newPhone => {
        match.phone_id = newPhone.id;
        return createMatch(t, match);
      });
    };
    let match: MatchModel = <MatchModel>ResponseService.getItemFromBody(req);
    const address: AddressModel = ResponseService.deleteItemDates(
      match.address
    );
    const phone: PhoneModel = ResponseService.deleteItemDates(match.phone);

    delete match.address;
    delete match.phone;

    match.game_id = req.params.game_id;

    sequelize
      .transaction(t => {
        return Address.create(address, { transaction: t }).then(newAddress => {
          //match.address_id = newAddress.id;
          return phone ? createPhone(t, phone, match) : createMatch(t, match);
        });
      })
      .then(result => {
        const aMatch = ResponseService.deleteItemDates(result);
        ResponseService.success(res, aMatch, 201);
      })
      .catch(error => this.exception(res, error));
  }

  function getMatchAddress(req, res) {
    this.getOne(req, res);
  }

  function updateMatchAddress(req, res) {}
  function deleteMatchAddress(req, res) {}

  return {
    getAll,
    getAllByMatch,
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

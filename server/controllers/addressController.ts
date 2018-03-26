import { AddressModel } from './../types/index';
import * as _ from 'lodash';

export default function AddressController(models, ResponseService) {
  const Address = models.Address;
  const attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];
  const joinMethod = model => item =>
    Object.assign({}, model, { address_id: item.id });

  // Get all
  function getAll(req, res) {
    Address.findAll({
      attributes: attributes
    })
      .then((addresses: AddressModel[]) =>
        ResponseService.success(res, addresses)
      )
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Address.findOne({
      where: {
        id: req.params.address_id
      },
      attributes: attributes
    })
      .then((address: AddressModel) => ResponseService.success(res, address))
      .catch(error => ResponseService.exception(res, error));
  }

  function getByOrganization(req, res) {
    const Organization = models.Organization;

    Organization.findAll({
      where: {
        id: req.params.organization_id
      },
      attributes: ['id', 'name', 'user_id'],
      include: [
        {
          model: Address,
          attributes: attributes,
          through: {
            attributes: []
          }
        }
      ]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByOrganization(req, res) {
    updateAddress(req, res);
  }

  function deleteByOrganization(req, res) {
    deleteAddress(req, res);
  }

  function selectBaseTableQuery(type, joinTableCreate) {
    return ResponseService.selectBaseTableQuery(type, Address, joinTableCreate);
  }

  function getBulkUpdateQuery(joinTable, joinMethod) {
    return ResponseService.bulkUpdateQuery(Address, joinTable, joinMethod);
  }

  function getQuery(type, itemsJoin, joinTable) {
    let query;

    if (/bulkUpdate/gi.test(type)) {
      query = getBulkUpdateQuery(joinTable, itemsJoin);
    } else {
      const joinTableCreate = ResponseService.joinTableCreate(
        itemsJoin,
        joinTable
      );
      query = selectBaseTableQuery(type, joinTableCreate);
    }
    return query;
  }

  function organizationExecuteQuery(req, res, type) {
    const joinTable = models.OrganizationAddress;
    const model = { organization_id: req.params.organization_id };
    const itemsJoin = joinMethod(model);
    const query = getQuery(type, itemsJoin, joinTable);
    query(req, res);
  }

  function organizationCreateAddress(req, res) {
    organizationExecuteQuery(req, res, 'create');
  }

  function organizationBulkCreateAddresses(req, res) {
    organizationExecuteQuery(req, res, 'bulkCreate');
  }

  function organizationBulkUpdateAddresses(req, res) {
    organizationExecuteQuery(req, res, 'bulkUpdate');
  }

  function userExecuteQuery(req, res, type) {
    const joinTable = models.UserAddress;
    const model = { user_id: req.params.user_id };
    const itemsJoin = joinMethod(model);
    const query = getQuery(type, itemsJoin, joinTable);
    query(req, res);
  }

  function userCreateAddress(req, res) {
    userExecuteQuery(req, res, 'create');
  }

  function userBulkCreateAddresses(req, res) {
    userExecuteQuery(req, res, 'bulkCreate');
  }

  function userBulkUpdateAddresses(req, res) {
    userExecuteQuery(req, res, 'bulkUpdate');
  }

  function getByUser(req, res) {
    const User = models.User;

    User.findOne({
      where: {
        id: req.params.user_id
      },
      include: [
        {
          model: Address,
          through: {
            attributes: []
          }
        }
      ]
    })
      .then(results => {
        ResponseService.success(res, results);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByUser(req, res) {
    updateAddress(req, res);
  }

  function deleteByUser(req, res) {
    deleteAddress(req, res);
  }

  function updateAddress(req, res) {
    const address_id = req.params.address_id;

    function update(oldAddress) {
      const newAddress = ResponseService.makeObject(req);

      return Address.update(newAddress, {
        where: {
          id: oldAddress.id
        }
      }).then(() => {
        return Address.findById(oldAddress.id);
      });
    }

    ResponseService.findObject(address_id, 'Address', res, update);
  }

  function deleteAddress(req, res) {
    const address_id = req.params.address_id;

    function doDelete(address) {
      return Address.destroy({
        where: {
          id: address.id
        }
      });
    }

    ResponseService.findObject(address_id, 'Address', res, doDelete, 204);
  }

  return {
    getAll,
    getOne,
    userCreateAddress,
    getByUser,
    updateByUser,
    deleteByUser,

    userBulkCreateAddresses,
    userBulkUpdateAddresses,

    organizationCreateAddress,
    getByOrganization,
    updateByOrganization,
    deleteByOrganization,

    organizationBulkCreateAddresses,
    organizationBulkUpdateAddresses
  };
}

import {IAddress} from './../types/index';
import * as _ from 'lodash';


export default function AddressController(models, ResponseService) {
  const Address = models.Address;
  const attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];
  const joinMethod = (model) => (item) =>  Object.assign({}, model, { address_id: item.id });

  // Get all
  function getAll(req, res) {
    Address.findAll({
      attributes: attributes
    })
      .then((addresses: IAddress[]) => ResponseService.success(res, addresses))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Address.findOne({
      where: {
        id: req.params.address_id
      },
      attributes: attributes
    })
      .then((address: IAddress) => ResponseService.success(res, address))
      .catch(error => ResponseService.exception(res, error));
  }

  function byOrganization(req, res, type) {
    const table = models.OrganizationAddress;
    const model = { organization_id: req.params.organization_id };

    ResponseService[type](req, res, Address, table, joinMethod(model));
  }

  function createByOrganization(req, res) {
     byOrganization(req, res, 'create');
  }

  function bulkCreateByOrganization(req, res) {
    byOrganization(req, res, 'bulkCreate');
  }

  function getByOrganization(req, res) {
    const Organization = models.Organization;

    Organization.findAll({
      where: {
        id: req.params.organization_id
      },
      attributes: ['id', 'name', 'user_id'],
      include: [{
        model: Address,
        attributes: attributes,
        through: {
          attributes: []
        }
      }]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function bulkUpdateByOrganization(req, res) {
    updateAddress(req, res);
  }

  function updateByOrganization(req, res) {
    updateAddress(req, res);
  }

  function deleteByOrganization(req, res) {
    deleteAddress(req, res);
  }

  function byUser(req, res, type) {
    const table = models.UserAddress;
    const model = { user_id: req.params.user_id };

    ResponseService[type](req, res, Address, table,  joinMethod(model));
  }

  function createByUser(req, res) {
    byUser(req, res, 'create');
  }

  function bulkCreateByUser(req, res) {
    byUser(req, res, 'bulkCreate');
  }

  function getByUser(req, res) {
    const User = models.User;

    User.findOne({
      where: {
        id: req.params.user_id
      },
      include: [{
        model: Address,
        through: {
          attributes: []
        }
      }]
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
      })
        .then(() => {
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
    bulkCreateByUser,
    createByUser,
    getByUser,
    updateByUser,
    deleteByUser,

    bulkCreateByOrganization,
    createByOrganization,
    getByOrganization,
    updateByOrganization,
    deleteByOrganization
  };
}

export default function AddressController(models, ResponseService) {
  const Address = models.Address;
  const attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];

  // Get all
  function getAll(req, res) {
    Address.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Address.findOne({
      where: {
        id: req.params.address_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res, joinTable, joinModel) {
    const sequelize = models.sequelize;
    let anAddress = ResponseService.makeObject(req);
    delete anAddress.id;

    sequelize.transaction(function(t) {
      return Address.create(anAddress, { transaction: t })
        .then(newAddress => {
          const model = Object.assign({}, joinModel, { address_id: newAddress.id });
          return joinTable.create(model, { transaction: t })
            .then(newModel => {
              ResponseService.success(res, newModel, 201);
            });
        });
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function createByOrganization(req, res) {
    const table = models.OrganizationAddress;
    const model = { organization_id: req.params.organization_id };
    create(req, res, table, model);
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

  function updateByOrganization(req, res) {
    updateAddress(req, res);
  }

  function deleteByOrganization(req, res) {
    deleteAddress(req, res);
  }

  function createByUser(req, res) {
    const table = models.UserAddress;
    const model = { user_id: req.params.user_id };
    create(req, res, table, model);
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
    createByUser,
    getByUser,
    updateByUser,
    deleteByUser,

    createByOrganization,
    getByOrganization,
    updateByOrganization,
    deleteByOrganization
  }
}

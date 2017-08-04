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

  function makeAddress(newAddress) {
    let address = new Object(newAddress);
    return address;
  }

  function returnAddress(res, address, status = 200) {
    let newAddress = makeAddress(address);
    newAddress["id"] = address.id;
    ResponseService.success(res, newAddress, status);
  }

  function create(req, res, joinTable, joinModel) {
    const sequelize = models.sequelize;
    const anAddress = makeAddress(req.body);

    sequelize.transaction(function(t) {
      return Address.create(anAddress, { transaction: t })
        .then(newAddress => {
          const model = Object.assign({}, joinModel, { address_id: newAddress.id });
          return joinTable.create(model, { transaction: t })
            .then(newModel => {
              ResponseService.success(res, newModel);
            });
        });
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function guardOrganization(req, res, callback) {
    const user_id = req.decoded.id;
    const Organization = models.Organization;

    if (ResponseService.isAdmin(req)) {
      callback();
    } else {
      Organization.findOne({
        where: {
          id: req.params.organization_id,
          user_id: user_id
        }
      })
        .then(organization => {
          if (organization) {
            callback();
          } else {
            ResponseService.failure(res, "Permissions violation.");
          }
        })
        .catch(error => ResponseService.exception(res, error));
    }
  }

  function createByOrganization(req, res) {
    function performCreation() {
      const table = models.OrganizationAddress;
      const model = { organization_id: req.params.organization_id };
      create(req, res, table, model);
    }
    guardOrganization(req, res, performCreation);
  }

  function getByOrganization(req, res) {
    const Organization = models.Organization;

    Organization.findAll({
      where: {
        id: req.params.organization_id
      },
      attributes: ['id','name', 'user_id'],
      include: [{
        model: Address,
        attributes: ['id', 'number', 'description'],
        through: {
          attributes: []
        }
      }]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByOrganization(req, res) {
    function performCreation() {
      const anAddress = makeAddress(req.body);
      Address.update(anAddress, {
        where: {
          id: req.params.address_id
        },
        include: [
          {
            model: Address
          }
        ]
      })
        .then(result => ResponseService.success(res, 'Address updated'))
        .catch(error => ResponseService.exception(res, error));
    }

    guardOrganization(req, res, performCreation);
  }

  function deleteByOrganization(req, res) {
    const anAddress = makeAddress(req.body);
    Address.destroy(anAddress)
      .then(result => ResponseService.success(res, 'Address deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function createByUser(req, res) {
    const table = models.UserAddress;
    const model = { user_id: req.params.user_id };
    console.log('createByUser');
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
        attributes: ['id', 'line1', 'line2', 'city', 'state', 'zip'],
        through: {
          attributes: []
        }
      }]
    })
      .then(results => {
        ResponseService.successCollection(res, results.addresses);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByUser(req, res) {
    const anAddress = makeAddress(req.body);
    Address.update(anAddress, {
      where: {
        id: req.params.address_id
      }
    })
      .then(result => ResponseService.success(res, 'Address updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteByUser(req, res) {
    const anAddress = makeAddress(req.body);
    Address.destroy(anAddress)
      .then(result => ResponseService.success(res, 'Address deleted'))
      .catch(error => ResponseService.exception(res, error));
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

export default function AddressController(models, ResponseService) {
  const Phone = models.Phone;
  const attributes = ['id', 'number', 'description'];

  // Get all
  function getAll(req, res) {
    Phone.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Phone.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makePhone(newPhone, withId) {
    withId = withId || false;
    let phone = {
      "number": newPhone.number,
      "description": newPhone.description
    };
    if (withId) {
      phone['id'] = newPhone.id;
    }
    return phone;
  }

  function create(req, res, joinTable, joinModel) {
    const sequelize = models.sequelize;
    const aPhone = makePhone(req.body, false);

    sequelize.transaction(function(t) {
      return Phone.create(aPhone, { transaction: t })
        .then(newPhone => {
          const model = Object.assign({}, joinModel, { phone_id: newPhone.id });
          return joinTable.create(model, { transaction: t })
            .then(newModel => {
              ResponseService.success(res, newModel);
            });
        });
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function createByOrganization(req, res) {
    const table = models.OrganizationPhone;
    const model = { organization_id: req.params.organization_id };
    create(req, res, table, model);
  }

  function updateByOrganization(req, res) {
    const aPhone = makePhone(req.body, false);
    Phone.update(aPhone, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Phone updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteByOrganization(req, res) {
    const aPhone = makePhone(req.body, true);
    Phone.destroy(aPhone)
      .then(result => ResponseService.success(res, 'Phone deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function createByPerson(req, res) {
    const table = models.PersonPhone;
    const model = { person_id: req.params.person_id };
    this.create(req, res, table, model);
  }

  function updateByPerson(req, res) {
    const aPhone = makePhone(req.body, false);
    Phone.update(aPhone, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Phone updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteByPerson(req, res) {
    const aPhone = makePhone(req.body, true);
    Phone.destroy(aPhone)
      .then(result => ResponseService.success(res, 'Phone deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll,
    getOne,
    createByPerson,
    updateByPerson,
    deleteByPerson,

    createByOrganization,
    updateByOrganization,
    deleteByOrganization
  }
}
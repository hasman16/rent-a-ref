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
        id: req.params.phone_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makePhone(newPhone) {
    let phone = {
      "number": newPhone.number,
      "description": newPhone.description
    };
    return phone;
  }

  function returnPhone(res, phone, status = 200) {
    let newPhone = makePhone(phone);
    newPhone["id"] = phone.id;
    ResponseService.success(res, newPhone, status);
  }

  function create(req, res, joinTable, joinModel) {
    const sequelize = models.sequelize;
    const aPhone = makePhone(req.body);

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

  function getByOrganization(req, res) {
    const OrganizationPhone = models.OrganizationPhone;

    OrganizationPhone.findAll({
      where: {
        organization_id: req.body.organization_id
      }
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByOrganization(req, res) {
    const aPhone = makePhone(req.body);
    Phone.update(aPhone, {
      where: {
        id: req.params.phone_id
      },
      include: [
        {
          mode: Phone
        }
      ]
    })
      .then(result => ResponseService.success(res, 'Phone updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteByOrganization(req, res) {
    const aPhone = makePhone(req.body);
    Phone.destroy(aPhone)
      .then(result => ResponseService.success(res, 'Phone deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function createByUser(req, res) {
    const table = models.UserPhone;
    const model = { user_id: req.params.user_id };
    this.create(req, res, table, model);
  }

  function getByUser(req, res) {
    const UserPhone = models.UserPhone;

    UserPhone.findAll({
      where: {
        person_id: req.body.user_id
      },
      include: [
        {
          mode: Phone
        }
      ]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateByUser(req, res) {
    const aPhone = makePhone(req.body);
    Phone.update(aPhone, {
      where: {
        id: req.params.phone_id
      }
    })
      .then(result => ResponseService.success(res, 'Phone updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteByUser(req, res) {
    const aPhone = makePhone(req.body);
    Phone.destroy(aPhone)
      .then(result => ResponseService.success(res, 'Phone deleted'))
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

import * as _ from 'lodash';

export default function PhoneController(models, ResponseService) {
  const Phone = models.Phone;
  const attributes = ['id', 'number', 'description'];

  // Get all
  function getAll(req, res) {
              console.log('PhoneController getAll:', Phone);
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
      'number': newPhone.number,
      'description': newPhone.description
    };
    return phone;
  }

  function returnPhone(res, phone, status = 200) {
    let newPhone = makePhone(phone);
    newPhone['id'] = phone.id;
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

  function bulkCreate(req, res, joinTable, joinModel) {
    const sequelize = models.sequelize;
    let Phones: any[] = _.map(req.body.phones, (phone) => {
      let aPhone = _.cloneDeep(phone);
      delete aPhone.id;
      return aPhone;
    });

    sequelize.transaction((t) => {
      return Phone.bulkCreate(Phones, { transaction: t, returning: true })
        .then((newPhones: any[]) => {
          return sequelize.Promise.each(newPhones, (newPhone) => {
            const model = Object.assign({}, joinModel, { phone_id: newPhone.id });
            return joinTable.create(model, { transaction: t });
          });
        })
        .then(newPhones => {
          ResponseService.success(res, newPhones, 201);
        });
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function createByOrganization(req, res) {
    const table = models.OrganizationPhone;
    const model = { organization_id: req.params.organization_id };
    create(req, res, table, model);
  }

  function bulkCreateByOrganization(req, res) {
    const table = models.OrganizationPhone;
    const model = { organization_id: req.params.organization_id };
    bulkCreate(req, res, table, model);
  }

  function getByOrganization(req, res) {
    const Organization = models.Organization;

    Organization.findAll({
      where: {
        id: req.params.organization_id
      },
      attributes: ['id', 'name', 'user_id'],
      include: [{
        model: Phone,
        attributes: ['id', 'number', 'description'],
        through: {
          attributes: []
        }
      }]
    })
      .then(results => ResponseService.successCollection(res, results))
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
          model: Phone
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
    create(req, res, table, model);
  }

  function bulkCreateByUser(req, res) {
    const table = models.UserPhone;
    const model = { user_id: req.params.user_id };
    bulkCreate(req, res, table, model);
  }

  function getByUser(req, res) {
    const User = models.User;

    User.findOne({
      where: {
        id: req.params.user_id
      },
      include: [{
        model: Phone,
        attributes: ['id', 'number', 'description'],
        through: {
          attributes: []
        }
      }]
    })
      .then(results => {
        ResponseService.successCollection(res, results.phones);
      })
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
    Phone.destroy({
      where: {
        id: req.params.phone_id
      }
    })
      .then(result => ResponseService.success(res, 'Phone deleted',204))
      .catch(error => ResponseService.exception(res, error));
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

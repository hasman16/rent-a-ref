import * as _ from 'lodash';

export default function PhoneController(models, ResponseService) {
  const Phone = models.Phone;
  const attributes = ['id', 'number', 'description'];
  const joinMethod = (model) => (item) =>  Object.assign({}, model, { phone_id: item.id });

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

  function byOrganization(req, res, type) {
    const table = models.OrganizationPhone;
    const model = { organization_id: req.params.organization_id };

    ResponseService[type](req, res, Phone, table, joinMethod(model));
  }

  function createByOrganization(req, res) {
     byOrganization(req, res, 'create');
  }

  function bulkCreateByOrganization(req, res) {
    byOrganization(req, res, 'bulkCreate');
  }

  function bulkUpdateByOrganization(req, res) {
    console.log('bulkUpdatephone:', req.body);
    byOrganization(req, res, 'bulkUpdate');
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

  function byUser(req, res, type) {
    const table = models.UserPhone;
    const model = { user_id: req.params.user_id };

    ResponseService[type](req, res, Phone, table,  joinMethod(model));
  }

  function createByUser(req, res) {
    byUser(req, res, 'create');
  }

  function bulkCreateByUser(req, res) {
    byUser(req, res, 'bulkCreate');
  }

  function bulkUpdateByUser(req, res) {
    byUser(req, res, 'bulkUpdate');
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
    bulkUpdateByUser,
    createByUser,
    getByUser,
    updateByUser,
    deleteByUser,

    bulkCreateByOrganization,
    bulkUpdateByOrganization,
    createByOrganization,
    getByOrganization,
    updateByOrganization,
    deleteByOrganization
  };
}

import * as _ from 'lodash';

export default function PhoneController(models, ResponseService) {
  const Phone = models.Phone;
  const attributes = ['id', 'number', 'description'];
  const joinMethod = model => item =>
    Object.assign({}, model, { phone_id: item.id });

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
      number: newPhone.number,
      description: newPhone.description
    };
    return phone;
  }

  function returnPhone(res, phone, status = 200) {
    let newPhone = makePhone(phone);
    newPhone['id'] = phone.id;
    ResponseService.success(res, newPhone, status);
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
          model: Phone,
          attributes: ['id', 'number', 'description'],
          through: {
            attributes: []
          }
        }
      ]
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

  function selectBaseTableQuery(type, joinTableCreate) {
    return ResponseService.selectBaseTableQuery(type, Phone, joinTableCreate);
  }

  function getBulkUpdateQuery(joinTable, joinMethod) {
    return ResponseService.bulkUpdateQuery(Phone, joinTable, joinMethod);
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
    const joinTable = models.OrganizationPhone;
    const model = { organization_id: req.params.organization_id };
    const itemsJoin = joinMethod(model);
    const query = getQuery(type, itemsJoin, joinTable);
    query(req, res);
  }

  function organizationCreatePhone(req, res) {
    organizationExecuteQuery(req, res, 'create');
  }

  function organizationBulkCreatePhones(req, res) {
    organizationExecuteQuery(req, res, 'bulkCreate');
  }

  function organizationBulkUpdatePhones(req, res) {
    organizationExecuteQuery(req, res, 'bulkUpdate');
  }

  function userExecuteQuery(req, res, type) {
    const joinTable = models.UserPhone;
    const model = { user_id: req.params.user_id };
    const itemsJoin = joinMethod(model);
    const query = getQuery(type, itemsJoin, joinTable);
    query(req, res);
  }

  function userCreatePhone(req, res) {
    userExecuteQuery(req, res, 'create');
  }

  function userBulkCreatePhones(req, res) {
    userExecuteQuery(req, res, 'bulkCreate');
  }

  function userBulkUpdatePhones(req, res) {
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
          model: Phone,
          attributes: ['id', 'number', 'description'],
          through: {
            attributes: []
          }
        }
      ]
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
      .then(result => ResponseService.success(res, 'Phone deleted', 204))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll,
    getOne,
    userBulkCreatePhones,
    userBulkUpdatePhones,
    userCreatePhone,
    getByUser,
    updateByUser,
    deleteByUser,

    organizationBulkCreatePhones,
    organizationBulkUpdatePhones,
    organizationCreatePhone,
    getByOrganization,
    updateByOrganization,
    deleteByOrganization
  };
}
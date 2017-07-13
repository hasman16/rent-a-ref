import ResponseService from './../util/responseService';

export default function OrganizationController(models) {
  var Organization = models.Organization;

  // Get all
  var getAll = (req, res) => {
    Organization.findAll({
      attributes: ['id', 'name', 'owner']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  var getOne = (req, res) => {
    Organization.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name']
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  var create = (req, res) => {
    var organization = new Object(req.body);
    Organization.create(organization)
      .then(newOrganization => {
        ResponseService.success(res, newOrganization);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  var update = (req, res) => {
    var organization = new Object(req.body);
    Organization.update(organization, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, "Organization updated"))
      .catch(error => ResponseService.exception(res, error));
  }

  var deleteOne = (req, res) => {
    var organization = new Object(req.body);
    Organization.destroy(organization)
      .then(result => ResponseService.success(res, "Organization deleted"))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  }
}

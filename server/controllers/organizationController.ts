export default function OrganizationController(models, ResponseService) {
  const Organization = models.Organization;
  const attributes = ['id', 'name', 'person_id'];

  function getAll(req, res) {
    Organization.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOrganizers(req, res) {
    const Organizer = models.Organizer;

    Organizer.findAll({
      where: {
        organization_id: req.params.id
      },
      include: [{
        model: models.Person
      }]
    })
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Organization.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const sequelize = models.sequelize;
    const person_id = req.decoded.person_id;
    const Organizer = models.Organizer;
    const organization = {
      name: req.body.name,
      person_id: person_id
    };

    sequelize.transaction(function(t) {
      return Organization.create(organization, { transaction: t })
        .then(newOrganization => {
          const organizer = {
            organization_id: newOrganization.id,
            person_id: person_id
          };
          return Organizer.create(organizer, { transaction: t })
            .then(newOrganizer => {
              const org = {
                id: newOrganization.id,
                name: newOrganization.name,
                person_id: newOrganization.person_id
              };
              ResponseService.success(res, org);
            });
        });
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const organization = {
      name: req.body.name
    };
    Organization.update(organization, {
      where: {
        id: req.params.id
      }
    })
      .then(result => getOne(req, res))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const organization = new Object(req.body);
    Organization.destroy(organization)
      .then(result => ResponseService.success(res, 'Organization deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll: getAll,
    getOrganizers:getOrganizers,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  }
}

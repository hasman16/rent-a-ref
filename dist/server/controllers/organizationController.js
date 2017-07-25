"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OrganizationController(models, ResponseService) {
    var Organization = models.Organization;
    var attributes = ['id', 'name', 'person_id'];
    function getAll(req, res) {
        Organization.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOrganizers(req, res) {
        var Organizer = models.Organizer;
        Organizer.findAll({
            where: {
                organization_id: req.params.id
            },
            include: [{
                    model: models.Person
                }]
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Organization.findOne({
            where: {
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var sequelize = models.sequelize;
        var person_id = req.decoded.person_id;
        var Organizer = models.Organizer;
        var organization = {
            name: req.body.name,
            person_id: person_id
        };
        sequelize.transaction(function (t) {
            return Organization.create(organization, { transaction: t })
                .then(function (newOrganization) {
                var organizer = {
                    organization_id: newOrganization.id,
                    person_id: person_id
                };
                return Organizer.create(organizer, { transaction: t })
                    .then(function (newOrganizer) {
                    var org = {
                        id: newOrganization.id,
                        name: newOrganization.name,
                        person_id: newOrganization.person_id
                    };
                    ResponseService.success(res, org);
                });
            });
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var organization = {
            name: req.body.name
        };
        Organization.update(organization, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return getOne(req, res); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var organization = new Object(req.body);
        Organization.destroy(organization)
            .then(function (result) { return ResponseService.success(res, 'Organization deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOrganizers: getOrganizers,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = OrganizationController;
//# sourceMappingURL=organizationController.js.map
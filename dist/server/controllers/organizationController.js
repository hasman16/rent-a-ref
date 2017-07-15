"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responseService_1 = require("./../util/responseService");
function OrganizationController(models) {
    var Organization = models.Organization;
    // Get all
    function getAll(req, res) {
        Organization.findAll({
            attributes: ['id', 'name', 'owner']
        })
            .then(function (results) { return responseService_1.default.success(res, results); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function getOne(req, res) {
        Organization.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name']
        })
            .then(function (result) { return responseService_1.default.success(res, result); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function create(req, res) {
        var organization = new Object(req.body);
        Organization.create(organization)
            .then(function (newOrganization) {
            responseService_1.default.success(res, newOrganization);
        })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function update(req, res) {
        var organization = new Object(req.body);
        Organization.update(organization, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return responseService_1.default.success(res, 'Organization updated'); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function deleteOne(req, res) {
        var organization = new Object(req.body);
        Organization.destroy(organization)
            .then(function (result) { return responseService_1.default.success(res, 'Organization deleted'); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = OrganizationController;
//# sourceMappingURL=organizationController.js.map
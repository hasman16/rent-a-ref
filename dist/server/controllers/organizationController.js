"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stripe = require("stripe");
function OrganizationController(models, ResponseService) {
    var Organization = models.Organization;
    var attributes = ['id', 'name', 'user_id'];
    var stripe = new Stripe(process.env.STRIPE_KEY);
    function getAll(req, res) {
        Organization.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getByUser(req, res) {
        var User = models.User;
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [
                {
                    model: Organization,
                    through: {
                        attributes: []
                    }
                }
            ]
        })
            .then(function (results) {
            ResponseService.success(res, results);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOrganizers(req, res) {
        var Organizer = models.Organizer;
        Organizer.findAll({
            where: {
                organization_id: req.params.organization_id
            },
            include: [
                {
                    model: models.Person
                }
            ]
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Organization.findOne({
            where: {
                id: req.params.organization_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var sequelize = models.sequelize;
        var user_id = req.decoded.id;
        var Organizer = models.Organizer;
        var organization = {
            name: req.body.name,
            user_id: user_id
        };
        sequelize
            .transaction(function (t) {
            return Organization.create(organization, { transaction: t }).then(function (newOrganization) {
                var organizer = {
                    organization_id: newOrganization.id,
                    user_id: user_id
                };
                return Organizer.create(organizer, { transaction: t }).then(function (newOrganizer) {
                    var org = {
                        id: newOrganization.id,
                        name: newOrganization.name,
                        user_id: newOrganization.user_id
                    };
                    ResponseService.success(res, org, 201);
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
                id: req.params.organization_id
            }
        })
            .then(function (result) { return getOne(req, res); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var organization_id = req.params.game_id;
        function doDelete(organization) {
            return Organization.destroy({
                where: {
                    id: organization.id
                }
            });
        }
        ResponseService.findObject(organization_id, 'Organization', res, doDelete, 204);
    }
    function makeStripePayment(req, res) {
        var token = ResponseService.getItemFromBody(req);
        // Charge the user's card:
        stripe.charges
            .create({
            amount: 777,
            currency: 'usd',
            description: 'Example charge',
            source: token
        })
            .then(function (charge) {
            ResponseService.success(res, charge);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    return {
        getAll: getAll,
        getByUser: getByUser,
        getOrganizers: getOrganizers,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        makeStripePayment: makeStripePayment
    };
}
exports.default = OrganizationController;
//# sourceMappingURL=organizationController.js.map
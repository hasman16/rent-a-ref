"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stripe = require("stripe");
function OrganizationController(models, ResponseService) {
    var Organization = models.Organization;
    var attributes = ['id', 'name', 'user_id'];
    var stripe = new Stripe(process.env.STRIPE_KEY);
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        console.log('clause:::', clause);
        Organization.findAndCountAll(clause)
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getByUser(req, res) {
        var User = models.User;
        var Image = models.Image;
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [
                {
                    model: Organization,
                    through: {
                        attributes: []
                    },
                    include: [
                        {
                            model: Image,
                            through: {
                                attributes: []
                            }
                        }
                    ]
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
            include: [
                {
                    model: models.Image
                }
            ],
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
        console.log('token is:', token.id);
        stripe.charges
            .create({
            amount: 777,
            currency: 'usd',
            description: 'Example charge',
            source: token.id
        })
            .then(function (charge) {
            ResponseService.success(res, charge);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    /*
    {
      fieldname: 'photo',
      originalname: 'blob',
      encoding: '7bit',
      mimetype: 'image/png',
      size: 102722,
      bucket: 'rentaref',
      key: '1525549567462',
      acl: 'private',
      contentType: 'application/octet-stream',
      contentDisposition: null,
      storageClass: 'STANDARD',
      serverSideEncryption: null,
      metadata: { fieldName: 'photo' },
      location: 'https://rentaref.s3.us-west-1.amazonaws.com/1525549567462',
      etag: '"c1fdf2fd9f3a5dbc41bc9527415736a0"'
    }
  */
    function uploadLogo(req, res) {
        var file = req.file;
        //console.log('uploadLogon:', file);
        if (file) {
            var sequelize = models.sequelize;
            var OrganizationImage_1 = models.OrganizationImage;
            var Image_1 = models.Image;
            var findOrganization_1 = function (newImage, t) {
                return Organization.findById(req.params.organization_id, {
                    transaction: t
                }).then(function (organization) {
                    return deleteOrganizationImage_1(newImage, organization, t);
                });
            };
            var deleteOrganizationImage_1 = function (newImage, organization, t) {
                return OrganizationImage_1.destroy({
                    where: {
                        organization_id: organization.id
                    }
                }, {
                    transaction: t
                }).then(function () {
                    return addOrganizationImage_1(newImage, organization, t);
                });
            };
            var addOrganizationImage_1 = function (newImage, organization, t) {
                return OrganizationImage_1.create({
                    image_id: newImage.id,
                    organization_id: organization.id
                }, {
                    transaction: t
                });
            };
            sequelize
                .transaction(function (t) {
                return Image_1.create(file, { transaction: t }).then(function (newImage) {
                    return findOrganization_1(newImage, t);
                });
            })
                .then(function () {
                ResponseService.success(res, 'Uploaded Image Successfully.');
            })
                .catch(function (error) { return ResponseService.exception(res, error); });
        }
        else {
            res.json(400, {
                success: false,
                message: 'upload failed.'
            });
        }
    }
    return {
        getAll: getAll,
        getByUser: getByUser,
        getOrganizers: getOrganizers,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        makeStripePayment: makeStripePayment,
        uploadLogo: uploadLogo
    };
}
exports.default = OrganizationController;
//# sourceMappingURL=organizationController.js.map
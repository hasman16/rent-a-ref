"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddressController(models, ResponseService) {
    var Address = models.Address;
    var attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];
    // Get all
    function getAll(req, res) {
        Address.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Address.findOne({
            where: {
                id: req.params.address_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res, joinTable, joinModel) {
        var sequelize = models.sequelize;
        var anAddress = ResponseService.makeObject(req);
        sequelize.transaction(function (t) {
            return Address.create(anAddress, { transaction: t })
                .then(function (newAddress) {
                var model = Object.assign({}, joinModel, { address_id: newAddress.id });
                return joinTable.create(model, { transaction: t })
                    .then(function (newModel) {
                    ResponseService.success(res, newModel, 201);
                });
            });
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function createByOrganization(req, res) {
        var table = models.OrganizationAddress;
        var model = { organization_id: req.params.organization_id };
        create(req, res, table, model);
    }
    function getByOrganization(req, res) {
        var Organization = models.Organization;
        Organization.findAll({
            where: {
                id: req.params.organization_id
            },
            attributes: ['id', 'name', 'user_id'],
            include: [{
                    model: Address,
                    attributes: attributes,
                    through: {
                        attributes: []
                    }
                }]
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateByOrganization(req, res) {
        updateAddress(req, res);
    }
    function deleteByOrganization(req, res) {
        deleteAddress(req, res);
    }
    function createByUser(req, res) {
        var table = models.UserAddress;
        var model = { user_id: req.params.user_id };
        create(req, res, table, model);
    }
    function getByUser(req, res) {
        var User = models.User;
        User.findOne({
            where: {
                id: req.params.user_id
            },
            attributes: ['id', 'email', 'can_referee', 'can_organize', 'status'],
            include: [{
                    model: Address,
                    through: {
                        attributes: []
                    }
                }]
        })
            .then(function (results) {
            ResponseService.success(res, results);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateByUser(req, res) {
        updateAddress(req, res);
    }
    function deleteByUser(req, res) {
        deleteAddress(req, res);
    }
    function updateAddress(req, res) {
        var address_id = req.params.address_id;
        function update(oldAddress) {
            var newAddress = ResponseService.makeObject(req);
            return Address.update(newAddress, {
                where: {
                    id: oldAddress.id
                }
            })
                .then(function () {
                return Address.findById(oldAddress.id);
            });
        }
        ResponseService.findObject(address_id, 'Address', res, update);
    }
    function deleteAddress(req, res) {
        var address_id = req.params.address_id;
        function doDelete(address) {
            return Address.destroy({
                where: {
                    id: address.id
                }
            });
        }
        ResponseService.findObject(address_id, 'Address', res, doDelete, 204);
    }
    return {
        getAll: getAll,
        getOne: getOne,
        createByUser: createByUser,
        getByUser: getByUser,
        updateByUser: updateByUser,
        deleteByUser: deleteByUser,
        createByOrganization: createByOrganization,
        getByOrganization: getByOrganization,
        updateByOrganization: updateByOrganization,
        deleteByOrganization: deleteByOrganization
    };
}
exports.default = AddressController;
//# sourceMappingURL=addressController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddressController(models, ResponseService) {
    var Address = models.Address;
    var attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];
    var joinMethod = function (model) { return function (item) {
        return Object.assign({}, model, { address_id: item.id });
    }; };
    // Get all
    function getAll(req, res) {
        Address.findAll({
            attributes: attributes
        })
            .then(function (addresses) {
            return ResponseService.success(res, addresses);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Address.findOne({
            where: {
                id: req.params.address_id
            },
            attributes: attributes
        })
            .then(function (address) { return ResponseService.success(res, address); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getByOrganization(req, res) {
        var Organization = models.Organization;
        Organization.findAll({
            where: {
                id: req.params.organization_id
            },
            attributes: ['id', 'name', 'user_id'],
            include: [
                {
                    model: Address,
                    attributes: attributes,
                    through: {
                        attributes: []
                    }
                }
            ]
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
    function selectBaseTableQuery(type, joinTableCreate) {
        return ResponseService.selectBaseTableQuery(type, Address, joinTableCreate);
    }
    function getBulkUpdateQuery(joinTable, joinMethod) {
        return ResponseService.bulkUpdateQuery(Address, joinTable, joinMethod);
    }
    function getQuery(type, itemsJoin, joinTable) {
        var query;
        if (/bulkUpdate/gi.test(type)) {
            query = getBulkUpdateQuery(joinTable, itemsJoin);
        }
        else {
            var joinTableCreate = ResponseService.joinTableCreate(itemsJoin, joinTable);
            query = selectBaseTableQuery(type, joinTableCreate);
        }
        return query;
    }
    function organizationExecuteQuery(req, res, type) {
        var joinTable = models.OrganizationAddress;
        var model = { organization_id: req.params.organization_id };
        var itemsJoin = joinMethod(model);
        var query = getQuery(type, itemsJoin, joinTable);
        query(req, res);
    }
    function organizationCreateAddress(req, res) {
        organizationExecuteQuery(req, res, 'create');
    }
    function organizationBulkCreateAddresses(req, res) {
        organizationExecuteQuery(req, res, 'bulkCreate');
    }
    function organizationBulkUpdateAddresses(req, res) {
        organizationExecuteQuery(req, res, 'bulkUpdate');
    }
    function userExecuteQuery(req, res, type) {
        var joinTable = models.UserAddress;
        var model = { user_id: req.params.user_id };
        var itemsJoin = joinMethod(model);
        var query = getQuery(type, itemsJoin, joinTable);
        query(req, res);
    }
    function userCreateAddress(req, res) {
        userExecuteQuery(req, res, 'create');
    }
    function userBulkCreateAddresses(req, res) {
        userExecuteQuery(req, res, 'bulkCreate');
    }
    function userBulkUpdateAddresses(req, res) {
        userExecuteQuery(req, res, 'bulkUpdate');
    }
    function getByUser(req, res) {
        var User = models.User;
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [
                {
                    model: Address,
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
            }).then(function () {
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
        userCreateAddress: userCreateAddress,
        getByUser: getByUser,
        updateByUser: updateByUser,
        deleteByUser: deleteByUser,
        userBulkCreateAddresses: userBulkCreateAddresses,
        userBulkUpdateAddresses: userBulkUpdateAddresses,
        organizationCreateAddress: organizationCreateAddress,
        getByOrganization: getByOrganization,
        updateByOrganization: updateByOrganization,
        deleteByOrganization: deleteByOrganization,
        organizationBulkCreateAddresses: organizationBulkCreateAddresses,
        organizationBulkUpdateAddresses: organizationBulkUpdateAddresses
    };
}
exports.default = AddressController;
//# sourceMappingURL=addressController.js.map
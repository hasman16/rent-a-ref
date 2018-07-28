"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PhoneController(models, ResponseService) {
    var Phone = models.Phone;
    var attributes = ['id', 'number', 'description'];
    var joinMethod = function (model) { return function (item) {
        return Object.assign({}, model, { phone_id: item.id });
    }; };
    // Get all
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Phone.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Phone.findOne({
            where: {
                id: req.params.phone_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makePhone(newPhone) {
        var phone = {
            number: newPhone.number,
            description: newPhone.description
        };
        return phone;
    }
    function returnPhone(res, phone, status) {
        if (status === void 0) { status = 200; }
        var newPhone = makePhone(phone);
        newPhone['id'] = phone.id;
        ResponseService.success(res, newPhone, status);
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
                    model: Phone,
                    attributes: ['id', 'number', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateByOrganization(req, res) {
        var aPhone = makePhone(req.body);
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
            .then(function (result) { return ResponseService.success(res, 'Phone updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteByOrganization(req, res) {
        var aPhone = makePhone(req.body);
        Phone.destroy(aPhone)
            .then(function (result) { return ResponseService.success(res, 'Phone deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function selectBaseTableQuery(type, joinTableCreate) {
        return ResponseService.selectBaseTableQuery(type, Phone, joinTableCreate);
    }
    function getBulkUpdateQuery(joinTable, joinMethod) {
        return ResponseService.bulkUpdateQuery(Phone, joinTable, joinMethod);
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
        var joinTable = models.OrganizationPhone;
        var model = { organization_id: req.params.organization_id };
        var itemsJoin = joinMethod(model);
        var query = getQuery(type, itemsJoin, joinTable);
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
        var joinTable = models.UserPhone;
        var model = { user_id: req.params.user_id };
        var itemsJoin = joinMethod(model);
        var query = getQuery(type, itemsJoin, joinTable);
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
        var User = models.User;
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
            .then(function (results) {
            ResponseService.successCollection(res, results.phones);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateByUser(req, res) {
        var aPhone = makePhone(req.body);
        Phone.update(aPhone, {
            where: {
                id: req.params.phone_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Phone updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteByUser(req, res) {
        Phone.destroy({
            where: {
                id: req.params.phone_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Phone deleted', 204); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        userBulkCreatePhones: userBulkCreatePhones,
        userBulkUpdatePhones: userBulkUpdatePhones,
        userCreatePhone: userCreatePhone,
        getByUser: getByUser,
        updateByUser: updateByUser,
        deleteByUser: deleteByUser,
        organizationBulkCreatePhones: organizationBulkCreatePhones,
        organizationBulkUpdatePhones: organizationBulkUpdatePhones,
        organizationCreatePhone: organizationCreatePhone,
        getByOrganization: getByOrganization,
        updateByOrganization: updateByOrganization,
        deleteByOrganization: deleteByOrganization
    };
}
exports.default = PhoneController;
//# sourceMappingURL=phoneController.js.map
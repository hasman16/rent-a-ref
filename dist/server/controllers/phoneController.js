"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PhoneController(models, ResponseService) {
    var Phone = models.Phone;
    var attributes = ['id', 'number', 'description'];
    // Get all
    function getAll(req, res) {
        Phone.findAll({
            attributes: attributes
        })
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
            'number': newPhone.number,
            'description': newPhone.description
        };
        return phone;
    }
    function returnPhone(res, phone, status) {
        if (status === void 0) { status = 200; }
        var newPhone = makePhone(phone);
        newPhone['id'] = phone.id;
        ResponseService.success(res, newPhone, status);
    }
    function create(req, res, joinTable, joinModel) {
        var sequelize = models.sequelize;
        var aPhone = makePhone(req.body);
        sequelize.transaction(function (t) {
            return Phone.create(aPhone, { transaction: t })
                .then(function (newPhone) {
                var model = Object.assign({}, joinModel, { phone_id: newPhone.id });
                return joinTable.create(model, { transaction: t })
                    .then(function (newModel) {
                    ResponseService.success(res, newModel);
                });
            });
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function createByOrganization(req, res) {
        var table = models.OrganizationPhone;
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
                    model: Phone,
                    attributes: ['id', 'number', 'description'],
                    through: {
                        attributes: []
                    }
                }]
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
    function createByUser(req, res) {
        var table = models.UserPhone;
        var model = { user_id: req.params.user_id };
        create(req, res, table, model);
    }
    function getByUser(req, res) {
        var User = models.User;
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [{
                    model: Phone,
                    attributes: ['id', 'number', 'description'],
                    through: {
                        attributes: []
                    }
                }]
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
exports.default = PhoneController;
//# sourceMappingURL=phoneController.js.map
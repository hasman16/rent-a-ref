"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddressController(models, ResponseService) {
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
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makePhone(newPhone, withId) {
        withId = withId || false;
        var phone = {
            "number": newPhone.number,
            "description": newPhone.description
        };
        if (withId) {
            phone['id'] = newPhone.id;
        }
        return phone;
    }
    function create(req, res, joinTable, joinModel) {
        var sequelize = models.sequelize;
        var aPhone = makePhone(req.body, false);
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
    function updateByOrganization(req, res) {
        var aPhone = makePhone(req.body, false);
        Phone.update(aPhone, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Phone updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteByOrganization(req, res) {
        var aPhone = makePhone(req.body, true);
        Phone.destroy(aPhone)
            .then(function (result) { return ResponseService.success(res, 'Phone deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function createByPerson(req, res) {
        var table = models.PersonPhone;
        var model = { person_id: req.params.person_id };
        this.create(req, res, table, model);
    }
    function updateByPerson(req, res) {
        var aPhone = makePhone(req.body, false);
        Phone.update(aPhone, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Phone updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteByPerson(req, res) {
        var aPhone = makePhone(req.body, true);
        Phone.destroy(aPhone)
            .then(function (result) { return ResponseService.success(res, 'Phone deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        createByPerson: createByPerson,
        updateByPerson: updateByPerson,
        deleteByPerson: deleteByPerson,
        createByOrganization: createByOrganization,
        updateByOrganization: updateByOrganization,
        deleteByOrganization: deleteByOrganization
    };
}
exports.default = AddressController;
//# sourceMappingURL=phoneController.js.map
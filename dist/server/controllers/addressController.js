"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddressController(models, ResponseService) {
    var Address = models.Address;
    var attributes = ['id', 'street1', 'street2', 'city', 'state', 'zip'];
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
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makeAddress(newAddress, withId) {
        withId = withId || false;
        var address = {
            street1: newAddress.street1,
            street2: newAddress.street2,
            city: newAddress.city,
            state: newAddress.state,
            zip: newAddress.zip
        };
        if (withId) {
            address['id'] = newAddress.id;
        }
        return address;
    }
    function create(req, res) {
        var anAddress = makeAddress(req.body, false);
        Address.create(anAddress)
            .then(function (newAddress) { return ResponseService.success(res, makeAddress(newAddress, true)); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var anAddress = makeAddress(req.body, false);
        Address.update(anAddress, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Address updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var anAddress = makeAddress(req.body, true);
        Address.destroy(anAddress)
            .then(function (result) { return ResponseService.success(res, 'Address deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = AddressController;
//# sourceMappingURL=addressController.js.map
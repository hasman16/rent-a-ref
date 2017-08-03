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
    function makeAddress(newAddress) {
        var address = {
            line1: newAddress.line1,
            line2: newAddress.line2,
            city: newAddress.city,
            state: newAddress.state,
            zip: newAddress.zip
        };
        return address;
    }
    function returnAddress(res, address, status) {
        if (status === void 0) { status = 200; }
        var newAddress = makeAddress(address);
        newAddress["id"] = address.id;
        ResponseService.success(res, newAddress, status);
    }
    function create(req, res) {
        var anAddress = makeAddress(req.body);
        Address.create(anAddress)
            .then(function (newAddress) { return returnAddress(res, newAddress, 201); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var anAddress = makeAddress(req.body);
        Address.update(anAddress, {
            where: {
                id: req.params.address_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Address updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var anAddress = makeAddress(req.body);
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
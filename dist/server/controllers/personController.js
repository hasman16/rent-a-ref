"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PersonController(models, ResponseService) {
    var Person = models.Person;
    var attributes = ['id', 'firstname', 'middlenames', 'lastname'];
    // Get all
    function getAll(req, res) {
        Person.findAll({
            attributes: attributes
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Person.findOne({
            where: {
                id: req.params.person_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makePerson(newPerson) {
        return {
            firstname: newPerson.firstname,
            middlenames: newPerson.middlenames,
            lastname: newPerson.lastname,
            dob: newPerson.dob
        };
    }
    function create(req, res) {
        var aPerson = ResponseService.getItemFromBody(req);
        delete aPerson.id;
        Person.create(aPerson)
            .then(function (newPerson) {
            ResponseService.success(res, newPerson, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var aPerson = ResponseService.getItemFromBody(req);
        delete aPerson.id;
        delete aPerson.user_id;
        if (aPerson.dob) {
            aPerson.dob = Number(aPerson.dob);
        }
        Person.update(aPerson, {
            where: {
                id: req.params.person_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Person updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        Person.destroy({
            where: {
                id: req.params.person_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Person deleted', 204); })
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
exports.default = PersonController;
//# sourceMappingURL=personController.js.map
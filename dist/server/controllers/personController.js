"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PersonController(models, ResponseService) {
    var Person = models.Person;
    var attributes = ['id', 'firstname', 'middlenames', 'lastname', 'sex'];
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
                id: req.params.id
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
        var aPerson = makePerson(req.body);
        Person.create(aPerson)
            .then(function (newPerson) {
            ResponseService.success(res, newPerson);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var aPerson = makePerson(req.body);
        Person.update(aPerson, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Person updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var person = makePerson(req.body);
        Person.destroy(person)
            .then(function (result) { return ResponseService.success(res, 'Person deleted'); })
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
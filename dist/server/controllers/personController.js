"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PersonController(models, ResponseService) {
    var Person = models.Person;
    // Get all
    function getAll(req, res) {
        console.log('get all persons');
        Person.findAll({
            attributes: ['id', 'firstname', 'lastname']
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        console.log('get person');
        Person.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'firstname', 'middlenames', 'lastname']
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var aPerson = new Object(req.body);
        Person.create(aPerson)
            .then(function (newPerson) {
            var person = {
                id: newPerson.id,
                firstname: newPerson.firstname,
                middlenames: newPerson.middlenames,
                lastname: newPerson.lastname
            };
            ResponseService.success(res, person);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var aPerson = new Object(req.body);
        Person.update(aPerson, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Person updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var person = new Object(req.body);
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
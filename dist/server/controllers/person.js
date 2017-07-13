"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responseService_1 = require("./../util/responseService");
function PersonController(models) {
    var Person = models.Person;
    // Get all
    var getAll = function (req, res) {
        console.log('get all persons');
        Person.findAll({
            attributes: ['id', 'firstname', 'lastname']
        })
            .then(function (results) { return responseService_1.default.success(res, results); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    };
    var getOne = function (req, res) {
        console.log('get person');
        Person.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'firstname', 'middlenames', 'lastname']
        })
            .then(function (results) { return responseService_1.default.success(res, results); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    };
    var create = function (req, res) {
        var person = new Object(req.body);
        Person.create(person)
            .then(function (newPerson) {
            var person = {
                id: newPerson.id,
                firstname: newPerson.firstname,
                middlenames: newPerson.middlenames,
                lastname: newPerson.lastname
            };
            responseService_1.default.success(res, person);
        })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    };
    var update = function (req, res) {
        var person = new Object(req.body);
        Person.update(person, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return responseService_1.default.success(res, "Person updated"); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    };
    var deleteOne = function (req, res) {
        var person = new Object(req.body);
        Person.destroy(person)
            .then(function (result) { return responseService_1.default.success(res, "Person deleted"); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    };
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = PersonController;
//# sourceMappingURL=person.js.map
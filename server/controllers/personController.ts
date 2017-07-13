import ResponseService from './../util/responseService';

export default function PersonController(models) {
  var Person = models.Person;

  // Get all
  var getAll = (req, res) => {
    console.log('get all persons');
    Person.findAll({
      attributes: ['id', 'firstname', 'lastname']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  var getOne = (req, res) => {
    console.log('get person');
    Person.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'firstname', 'middlenames', 'lastname']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  var create = (req, res) => {
    var person = new Object(req.body);
    Person.create(person)
      .then(newPerson => {
        var person = {
          id: newPerson.id,
          firstname: newPerson.firstname,
          middlenames: newPerson.middlenames,
          lastname: newPerson.lastname
        }
        ResponseService.success(res, person);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  var update = (req, res) => {
    var person = new Object(req.body);
    Person.update(person, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, "Person updated"))
      .catch(error => ResponseService.exception(res, error));
  }

  var deleteOne = (req, res) => {
    var person = new Object(req.body);
    Person.destroy(person)
      .then(result => ResponseService.success(res, "Person deleted"))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  }
}

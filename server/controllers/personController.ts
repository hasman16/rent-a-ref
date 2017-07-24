export default function PersonController(models, ResponseService) {
  const Person = models.Person;
  const attributes = ['id', 'firstname', 'middlenames', 'lastname', 'sex'];

  // Get all
  function getAll(req, res) {
    Person.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Person.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const aPerson = new Object(req.body);
    Person.create(aPerson)
      .then(newPerson => {
        const person = {
          id: newPerson.id,
          firstname: newPerson.firstname,
          middlenames: newPerson.middlenames,
          lastname: newPerson.lastname
        }
        ResponseService.success(res, person);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const aPerson = new Object(req.body);
    Person.update(aPerson, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Person updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const person = new Object(req.body);
    Person.destroy(person)
      .then(result => ResponseService.success(res, 'Person deleted'))
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

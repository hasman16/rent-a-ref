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

  function makePerson(newPerson) {
    return {
      firstname: newPerson.firstname,
      middlenames: newPerson.middlenames,
      lastname: newPerson.lastname,
      dob: newPerson.dob
    };
  }

  function create(req, res) {
    const aPerson = makePerson(req.body);
    Person.create(aPerson)
      .then(newPerson => {
        ResponseService.success(res, newPerson);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const aPerson = makePerson(req.body);
    Person.update(aPerson, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Person updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const person = makePerson(req.body);
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

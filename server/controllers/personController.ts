import {IPerson} from './../types/index';

export default function PersonController(models, ResponseService) {
  const Person = models.Person;
  const attributes = ['id', 'firstname', 'middlenames', 'lastname'];

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
        id: req.params.person_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makePerson(newPerson) {
    return <IPerson>{
      firstname: newPerson.firstname,
      middlenames: newPerson.middlenames,
      lastname: newPerson.lastname,
      dob: newPerson.dob
    };
  }

  function create(req, res) {
    let aPerson = ResponseService.getItemFromBody(req);
    delete aPerson.id;

    Person.create(aPerson)
      .then(newPerson => {
        ResponseService.success(res, newPerson, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    let aPerson = ResponseService.getItemFromBody(req);
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
      .then(result => ResponseService.success(res, 'Person updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    Person.destroy({
      where:{
        id: req.params.person_id
      }
    })
      .then(result => ResponseService.success(res, 'Person deleted', 204))
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

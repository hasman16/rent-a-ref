export default function AddressController(models, ResponseService) {
  const Phone = models.Phone;
  const attributes = ['id', 'number', 'description'];

  // Get all
  function getAll(req, res) {
    Phone.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Phone.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makePhone(newPhone) {
    let phone = {
          "number": newPhone["number"],
          "description": newPhone['description']
    };
    if (withId) {
      phone['id'] = newPhone.id;
    }
    return phone;
  }

  function create(req, res) {
    const aPhone = makePhone(req.body, false);

    Phone.create(aPhone)
      .then(newPhone => {
        ResponseService.success(res, newPhone);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const aPhone = makePhone(req.body, false);
    aPhone.update(aPhone, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Phone updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const aPhone = makePhone(req.body, true);
    Phone.destroy(aPhone)
      .then(result => ResponseService.success(res, 'Phone deleted'))
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

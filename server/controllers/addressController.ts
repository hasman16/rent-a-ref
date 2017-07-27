export default function AddressController(models, ResponseService) {
  const Address = models.Address;
  const attributes = ['id', 'street1', 'street2', 'city', 'state', 'zip'];

  // Get all
  function getAll(req, res) {
    Address.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    Address.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makeAddress(newAddress, withId) {
    withId = withId || false;
    let address = {
      street1: newAddress.street1,
      street2: newAddress.street2,
      city: newAddress.city,
      state: newAddress.state,
      zip: newAddress.zip
    };
    if (withId) {
      address['id'] = newAddress.id;
    }

    return address;
  }

  function create(req, res) {
    const anAddress = makeAddress(req.body, false);

    Address.create(anAddress)
      .then(newAddress => ResponseService.success(res, makeAddress(newAddress, true)))
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const anAddress = makeAddress(req.body, false);

    Address.update(anAddress, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'Address updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const anAddress = makeAddress(req.body, true);

    Address.destroy(anAddress)
      .then(result => ResponseService.success(res, 'Address deleted'))
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

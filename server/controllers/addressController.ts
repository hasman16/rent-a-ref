export default function AddressController(models, ResponseService) {
  const Address = models.Address;
  const attributes = ['id', 'line1', 'line2', 'city', 'state', 'zip'];

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
        id: req.params.address_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makeAddress(newAddress) {
    const address = {
      line1: newAddress.line1,
      line2: newAddress.line2,
      city: newAddress.city,
      state: newAddress.state,
      zip: newAddress.zip
    };

    return address;
  }

  function returnAddress(res, address, status = 200) {
    let newAddress = makeAddress(address);
    newAddress["id"] = address.id;
    ResponseService.success(res, newAddress, status);
  }

  function create(req, res) {
    const anAddress = makeAddress(req.body);

    Address.create(anAddress)
      .then(newAddress => returnAddress(res, newAddress, 201))
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const anAddress = makeAddress(req.body);

    Address.update(anAddress, {
      where: {
        id: req.params.address_id
      }
    })
      .then(result => ResponseService.success(res, 'Address updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const anAddress = makeAddress(req.body);

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

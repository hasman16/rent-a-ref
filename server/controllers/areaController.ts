export default function AreaController(models, ResponseService) {
  const Area = models.Area;

  function createLocation(req, res) {
    const area = Object.assign({}, req.body, { user_id: req.params.user_id });
    Area.create(area)
      .then(result => ResponseService.success(res, result, 201))
      .catch(error => ResponseService.exception(res, error));
  }

  function updateLocation(req, res) {
    const location_id = req.params.location_id;
    const user_id = req.params.user_id;
    
    function update(oldLocation) {
      let newLocation = Object.assign({}, req.body);
      delete newLocation.user_id;
      return Area.update(newLocation, {
        where: {
          id: location_id,
          user_id: user_id
        }
      });
    }

    ResponseService.findObject(location_id, 'Area', res, update);
  }

  function deleteLocation(req, res) {
    const location_id = req.params.location_id;
    function doDelete(location) {
      return Area.destroy({
        where: {
          id: location.id
        }
      });
    }
    ResponseService.findObject(location_id, 'Area', res, doDelete, 204);
  }

  return {
    createLocation,
    updateLocation,
    deleteLocation
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AreaController(models, ResponseService) {
    var Area = models.Area;
    function createLocation(req, res) {
        var area = Object.assign({}, req.body, { user_id: req.decoded.id });
        Area.create(area)
            .then(function (result) { return ResponseService.success(res, result, 201); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function updateLocation(req, res) {
        var location_id = req.params.location_id;
        function update(oldLocation) {
            var newLocation = Object.assign({}, req.body);
            delete newLocation.user_id;
            return Area.update(newLocation, {
                where: {
                    id: oldLocation.id,
                    user_id: req.decode.id
                }
            });
        }
        console.log('updateLocation');
        ResponseService.findObject(location_id, 'Area', res, update);
    }
    function deleteLocation(req, res) {
        var location_id = req.params.location_id;
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
        createLocation: createLocation,
        updateLocation: updateLocation,
        deleteLocation: deleteLocation
    };
}
exports.default = AreaController;
//# sourceMappingURL=areaController.js.map
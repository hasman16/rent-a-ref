"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function areaRoutes(setter, areaCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    router.use('/users/:user_id/location_preference', authentication, isUserOrAdmin);
    router.route('/users/:user_id/location_preference').post(areaCtrl.createLocation);
    router.use('/users/:user_id/location_preference/:location_id', authentication, isUserOrAdmin);
    router.route('/users/:user_id/location_preference/:location_id').put(areaCtrl.updateLocation);
    router.route('/users/:user_id/location_preference/:location_id').patch(areaCtrl.updateLocation);
    router.route('/users/:user_id/location_preference/:location_id').delete(areaCtrl.deleteLocation);
}
exports.default = areaRoutes;
//# sourceMappingURL=areaRoutes.js.map
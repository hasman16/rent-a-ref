export default function areaRoutes(setter, areaCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.use('/users/:user_id/location_preference', authentication, isUserOrAdmin);
  router.route('/users/:user_id/location_preference').post(areaCtrl.createLocation);

  router.use('/location_preference/:location_id', authentication);
  router.route('/location_preference/:location_id').put(areaCtrl.updateLocation);
  router.route('/location_preference/:location_id').patch(areaCtrl.updateLocation);
  router.route('/location_preference/:location_id').delete(areaCtrl.deleteLocation);
}

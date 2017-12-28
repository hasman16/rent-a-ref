export default function personRoutes(setter, personCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.route('/people').get(authentication, isAdmin, personCtrl.getAll);

  router.route('/people/:person_id').get(authentication, personCtrl.getOne);
  router.route('/people/:person_id').put(authentication, personCtrl.update);
  router.route('/people/:person_id').patch(authentication, personCtrl.update);
  router.route('/people/:person_id').delete(authentication, isAdmin, personCtrl.deleteOne);
}

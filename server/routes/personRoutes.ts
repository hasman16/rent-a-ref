export default function personRoutes(setter, personCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.route('/person').get(authentication, isAdmin, personCtrl.getAll);

  router.route('/person/:person_id').get(authentication, personCtrl.getOne);
  router.route('/person/:person_id').put(authentication, isUserOrAdmin, personCtrl.update);
  router.route('/person/:person_id').patch(authentication, isUserOrAdmin, personCtrl.update);
  router.route('/person/:person_id').delete(authentication, isAdmin, personCtrl.deleteOne);
}

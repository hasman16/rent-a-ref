export default function sportRoutes(setter, sportCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;

  router.route('/sport').get(authentication, sportCtrl.getAll);
  router.route('/sport').post(authentication, authorization.isAdmin, sportCtrl.create);
  router.route('/sport/:sport_id').get(authentication, sportCtrl.getOne);
  router.route('/sport/:sport_id').put(authentication, authorization.isAdmin, sportCtrl.updateOne);
  router.route('/sport/:sport_id').patch(authentication, authorization.isAdmin, sportCtrl.updateOne);
  router.route('/sport/:sport_id').delete(authentication, authorization.isAdmin, sportCtrl.deleteOne);
}

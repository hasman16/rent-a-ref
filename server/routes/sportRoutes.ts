export default function sportRoutes(setter, sportCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;

  router.route('/sport').get(authentication, sportCtrl.getAll);
  router.route('/sport').post(authentication, authorization.isAdmin, sportCtrl.create);
  router.route('/sport/:id').get(authentication, sportCtrl.getOne);
  router.route('/sport/:id').put(authentication, authorization.isAdmin, sportCtrl.updateOne);
  router.route('/sport/:id').delete(authentication, authorization.isAdmin, sportCtrl.deleteOne);
}

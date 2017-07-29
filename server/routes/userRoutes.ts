export default function userRoutes(setter, userCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;

  router.route('/login').post(userCtrl.login);
  router.route('/logout').post(userCtrl.logout);

  router.route('/user').get(authentication, authorization.isAdmin, userCtrl.getAll);

  router.route('/user').post(userCtrl.create);
  router.route('/register').post(userCtrl.create);

  router.route('/user/:user_id').get(authentication, authorization.isUserOrAdmin, userCtrl.getOne);
  router.route('/user/:user_id').put(authentication, authorization.isUserOrAdmin, userCtrl.update);
  router.route('/user/:user_id').delete(authentication, authorization.isUserOrAdmin, userCtrl.deleteOne);
}

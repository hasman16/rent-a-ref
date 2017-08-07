export default function userRoutes(setter, userCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;

  router.route('/login').post(userCtrl.login);
  router.route('/logout').post(userCtrl.logout);

  router.route('/users').get(authentication, isAdmin, userCtrl.getAll);

  router.route('/users').post(userCtrl.create);
  router.route('/register').post(userCtrl.create);

  router.route('/users/:user_id').get(authentication, isUserOrAdmin, userCtrl.getOne);
  router.route('/users/:user_id').put(authentication, isUserOrAdmin, userCtrl.update);
  router.route('/users/:user_id').patch(authentication, isUserOrAdmin, userCtrl.update);
  router.route('/users/:user_id').delete(authentication, isUserOrAdmin, userCtrl.deleteOne);
}

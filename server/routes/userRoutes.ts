export default function userRoutes(setter, ctrls) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const userCtrl = ctrls.userCtrl;
  const loginCtrl = ctrls.loginCtrl;
  const registerCtrl = ctrls.registerCtrl;

  router.route('/login').post(loginCtrl.login);
  router.route('/logout').post(userCtrl.logout);

  router.route('/users').get(authentication, isAdmin, userCtrl.getAll);

  router.route('/users').post(registerCtrl.registerUser);
  router.route('/register').post(registerCtrl.registerUser);

  router.route('/users/:user_id').get(authentication, isUserOrAdmin, userCtrl.getOne);
  router.route('/users/:user_id').put(authentication, isUserOrAdmin, userCtrl.update);
  router.route('/users/:user_id').patch(authentication, isUserOrAdmin, userCtrl.update);
  router.route('/users/:user_id').delete(authentication, isUserOrAdmin, userCtrl.deleteOne);
}

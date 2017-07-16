export default function userRoutes(router, authentication, userCtrl) {
  router.route('/login').post(userCtrl.login);
  router.route('/logout').post(userCtrl.logout);

  router.route('/user').get(authentication, userCtrl.getAll);
  router.route('/user').post(userCtrl.create);
  router.route('/user/:id').get(authentication, userCtrl.getOne);
  router.route('/user/:id').put(authentication, userCtrl.update);
  router.route('/user/:id').delete(authentication, userCtrl.deleteOne);
}

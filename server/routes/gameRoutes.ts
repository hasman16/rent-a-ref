export default function gameRoutes(router, authentication, gameCtrl) {
  router.route('/game').get(authentication, gameCtrl.getAll);
  router.route('/game').post(authentication, gameCtrl.create);
  router.route('/game/:id').get(authentication, gameCtrl.getOne);
  router.route('/game/:id').put(authentication, gameCtrl.update);
  router.route('/game/:id').delete(authentication, gameCtrl.deleteOne);
}

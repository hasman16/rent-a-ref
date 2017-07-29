export default function gameRoutes(setter, gameCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;

  router.route('/game').get(authentication, gameCtrl.getAll);
  router.route('/game').post(authentication, gameCtrl.create);
  router.route('/game/:game_id').get(authentication, gameCtrl.getOne);
  router.route('/game/:game_id').put(authentication, gameCtrl.update);
  router.route('/game/:game_id').delete(authentication, gameCtrl.deleteOne);
}

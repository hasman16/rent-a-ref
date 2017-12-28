export default function gameRoutes(setter, gameCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;

  router.route('/games').get(authentication, gameCtrl.getAll);
  router.route('/games').post(authentication, gameCtrl.create);
  router.route('/games/:game_id').get(authentication, gameCtrl.getOne);
  router.route('/games/:game_id').put(authentication, gameCtrl.update);
  router.route('/games/:game_id').patch(authentication, gameCtrl.update);
  router.route('/games/:game_id').delete(authentication, gameCtrl.deleteOne);
}

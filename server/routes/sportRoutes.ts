export default function sportRoutes(router, authentication, sportCtrl) {
  router.route('/sport').get(authentication, sportCtrl.getAll);
  router.route('/sport').post(authentication, sportCtrl.create);
  router.route('/sport/:id').get(authentication, sportCtrl.getOne);
  router.route('/sport/:id').put(authentication, sportCtrl.update);
  router.route('/sport/:id').delete(authentication, sportCtrl.deleteOne);
}

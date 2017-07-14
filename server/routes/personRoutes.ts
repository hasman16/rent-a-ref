export default function personRoutes(router, authentication, personCtrl) {
  router.route('/person').get(authentication, personCtrl.getAll);
  router.route('/person').post(authentication, personCtrl.create);
  router.route('/person/:id').get(authentication, personCtrl.getOne);
  router.route('/person/:id').put(authentication, personCtrl.update);
  router.route('/person/:id').delete(authentication, personCtrl.deleteOne);
}

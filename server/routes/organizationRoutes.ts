export default function organizationRoutes(router, authentication, organizationCtrl) {
  router.route('/person').get(authentication, organizationCtrl.getAll);
  router.route('/person').post(authentication, organizationCtrl.create);
  router.route('/person/:id').get(authentication, organizationCtrl.getOne);
  router.route('/person/:id').put(authentication, organizationCtrl.update);
  router.route('/person/:id').delete(authentication, organizationCtrl.deleteOne);
}

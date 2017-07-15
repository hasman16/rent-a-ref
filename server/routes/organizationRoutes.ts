export default function organizationRoutes(router, authentication, organizationCtrl) {
  router.route('/organization').get(authentication, organizationCtrl.getAll);
  router.route('/organization').post(authentication, organizationCtrl.create);
  router.route('/organization/:id').get(authentication, organizationCtrl.getOne);
  router.route('/organization/:id').put(authentication, organizationCtrl.update);
  router.route('/organization/:id').delete(authentication, organizationCtrl.deleteOne);
}

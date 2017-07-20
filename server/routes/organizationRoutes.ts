export default function organizationRoutes(setter, organizationCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  router.route('/organizer/:id').get(authentication, organizationCtrl.getOrganizers);

  router.route('/organization').get(authentication, organizationCtrl.getAll);
  router.route('/organization').post(authentication, organizationCtrl.create);
  router.route('/organization/:id').get(authentication, organizationCtrl.getOne);
  router.route('/organization/:id').put(authentication, organizationCtrl.update);
  router.route('/organization/:id').delete(authentication, organizationCtrl.deleteOne);
}

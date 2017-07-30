export default function organizationRoutes(setter, organizationCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  router.route('/organizer/:organization_id').get(authentication, organizationCtrl.getOrganizers);

  router.route('/organization').get(authentication, organizationCtrl.getAll);
  router.route('/organization').post(authentication, organizationCtrl.create);
  router.route('/organization/:organization_id').get(authentication, organizationCtrl.getOne);
  router.route('/organization/:organization_id').put(authentication, organizationCtrl.update);
  router.route('/organization/:organization_id').delete(authentication, organizationCtrl.deleteOne);
}

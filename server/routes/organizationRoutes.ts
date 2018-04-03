export default function organizationRoutes(setter, organizationCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isOrgOwner = authorization.isOrgOwner;
  const isOrgMember = authorization.isOrgMember;

  router.route('/organizers/:organization_id').get(authentication, organizationCtrl.getOrganizers);

  router.route('/organizations').get(authentication, organizationCtrl.getAll);
  router.route('/users/:user_id/organizations').get(authentication, organizationCtrl.getByUser);

  router.route('/organizations').post(authentication, organizationCtrl.create);
  router.route('/organizations/:organization_id').get(authentication, organizationCtrl.getOne);
  router.route('/organizations/:organization_id').put(authentication, isOrgOwner, organizationCtrl.update);
  router.route('/organizations/:organization_id').delete(authentication, isOrgOwner, organizationCtrl.deleteOne);

  router.route('/make_payment').post(authentication, organizationCtrl.makeStripePayment);  
}

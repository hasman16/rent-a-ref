export default function addressRoutes(setter, addressCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isOrgOwner = authorization.isOrgOwner;
  const isOrgMember = authorization.isOrgMember;

  router.route('/addresses').get(authentication, isAdmin, addressCtrl.getAll);
  router.route('/organizations/:organization_id/addresses').get(authentication, addressCtrl.getByOrganization);
  router.route('/organizations/:organization_id/addresses').post(authentication, addressCtrl.organizationCreateAddress);

  router.use('/organizations/:organization_id/addresses/bulk', authentication);
  router.route('/organizations/:organization_id/addresses/bulk').post(addressCtrl.organizationBulkCreateAddresses);
  router.route('/organizations/:organization_id/addresses/bulk').put(isOrgOwner, addressCtrl.organizationBulkUpdateAddresses);
  router.route('/organizations/:organization_id/addresses/bulk').patch(isOrgOwner, addressCtrl.organizationBulkUpdateAddresses);

  router.use('/organizations/:organization_id/addresses/:address_id', authentication, isOrgOwner);
  router.route('/organizations/:organization_id/addresses/:address_id').put(addressCtrl.updateByOrganization);
  router.route('/organizations/:organization_id/addresses/:address_id').patch(addressCtrl.updateByOrganization);
  router.route('/organizations/:organization_id/addresses/:address_id').delete(addressCtrl.deleteByOrganization);

  router.use('/users/:user_id/addresses', authentication, isUserOrAdmin);
  router.route('/users/:user_id/addresses').get(addressCtrl.getByUser);
  router.route('/users/:user_id/addresses').post(addressCtrl.userCreateAddress);

  router.use('/users/:user_id/addresses/bulk', authentication, isUserOrAdmin);
  router.route('/users/:user_id/addresses/bulk').post(addressCtrl.userBulkCreateAddresses);
  router.route('/users/:user_id/addresses/bulk').put(addressCtrl.userBulkUpdateAddresses);
  router.route('/users/:user_id/addresses/bulk').patch(addressCtrl.userBulkUpdateAddresses);

  router.use('/users/:user_id/addresses/:address_id', authentication, isUserOrAdmin);
  router.route('/users/:user_id/addresses/:address_id').put(addressCtrl.updateByUser);
  router.route('/users/:user_id/addresses/:address_id').patch(addressCtrl.updateByUser);
  router.route('/users/:user_id/addresses/:address_id').delete(isAdmin, addressCtrl.deleteByUser);
}

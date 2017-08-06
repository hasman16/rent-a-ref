export default function addressRoutes(setter, addressCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const orgIsOwner = authorization.orgIsOwner;
  const orgIsMember = authorization.orgIsMember;

  router.route('/address').get(authentication, isAdmin, addressCtrl.getAll);

  router.route('/organization/:organization_id/address').post(authentication, addressCtrl.createByOrganization);
  router.route('/organization/:organization_id/address').get(authentication, addressCtrl.getByOrganization);
  router.route('/organization/:organization_id/address/:address_id').put(authentication, orgIsOwner, addressCtrl.updateByOrganization);
  router.route('/organization/:organization_id/address/:address_id').delete(authentication, orgIsOwner, addressCtrl.deleteByOrganization);

  router.route('/user/:user_id/address').post(authentication, isUserOrAdmin, addressCtrl.createByUser);
  router.route('/user/:user_id/address').get(authentication, isUserOrAdmin, addressCtrl.getByUser);
  router.route('/user/:user_id/address/:address_id').put(authentication, isUserOrAdmin, addressCtrl.updateByUser);
  router.route('/user/:user_id/address/:address_id').delete(authentication, isAdmin, addressCtrl.deleteByUser);
}

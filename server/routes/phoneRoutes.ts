export default function phoneRoutes(setter, phoneCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const orgIsOwner = authorization.orgIsOwner;
  const orgIsMember = authorization.orgIsMember;

  router.route('/phone').get(authentication, isAdmin, phoneCtrl.getAll);

  router.route('/organization/:organization_id/phone').post(authentication, phoneCtrl.createByOrganization);
  router.route('/organization/:organization_id/phone').get(authentication, phoneCtrl.getByOrganization);
  router.route('/organization/:organization_id/phone/:phone_id').put(authentication, orgIsOwner, phoneCtrl.updateByOrganization);
  router.route('/organization/:organization_id/phone/:phone_id').delete(authentication, orgIsOwner, phoneCtrl.deleteByOrganization);

  router.route('/user/:user_id/phone').post(authentication, isUserOrAdmin, phoneCtrl.createByUser);
  router.route('/user/:user_id/phone').get(authentication, isUserOrAdmin, phoneCtrl.getByUser);
  router.route('/user/:user_id/phone/:phone_id').put(authentication, isUserOrAdmin, phoneCtrl.updateByUser);
  router.route('/user/:user_id/phone/:phone_id').delete(authentication, isAdmin, phoneCtrl.deleteByUser);

}

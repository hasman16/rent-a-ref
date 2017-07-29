export default function phoneRoutes(setter, phoneCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const personPhone = 'person/person_id/phone/phone_id';

  router.route('/phone').get(authentication, isAdmin, phoneCtrl.getAll);

  router.route('/organization/:organization_id/phone').post(authentication, phoneCtrl.createByOrganization);
  router.route('/organization/:organization_id/phone').get(authentication, phoneCtrl.getByOrganization);
  router.route('/organization/:organization_id/phone/phone_id').put(authentication, phoneCtrl.updateByOrganization);
  router.route('/organization/:organization_id/phone/phone_id').delete(authentication, phoneCtrl.deleteByOrganization);

  router.route('/person/:person_id/phone').post(authentication, isUserOrAdmin, phoneCtrl.createByPerson);
  router.route('/person/person_id/phone').get(authentication, isUserOrAdmin, phoneCtrl.getByPerson);
  router.route('/person/person_id/phone/phone_id').put(authentication, isUserOrAdmin, phoneCtrl.updateByPerson);
  router.route('/person/person_id/phone/phone_id').delete(authentication, isUserOrAdmin, phoneCtrl.deleteByPerson);

}

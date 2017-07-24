export default function personRoutes(setter, personCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const uploads = setter.uploads;
  
  router.route('/person').get(authentication, personCtrl.getAll);

  router.route('/person/:id').get(authentication, personCtrl.getOne);
  router.route('/person/:id').put(authentication, authorization.isAdmin, personCtrl.update);
  router.route('/person/:id').delete(authentication, authorization.isAdmin, personCtrl.deleteOne);
}

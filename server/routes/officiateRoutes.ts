export default function officiateRoutes(setter, officiateCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const imageUploader = setter.imageUploader;

  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isUser = authorization.isUser;

  router
    .route('/schedule_by_referee/:user_id')
    .get(authentication, isUserOrAdmin, officiateCtrl.matchScheduleByUser);
  router
    .route('/officiate_match')
    .post(authentication, isAdmin, officiateCtrl.addOfficialToMatch);
  router
    .route('/remove_official')
    .delete(authentication, isAdmin, officiateCtrl.removeOfficialFromMatch);
}

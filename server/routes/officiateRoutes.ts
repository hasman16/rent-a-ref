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
    .route('/accept_match')
    .post(authentication, isUserOrAdmin, officiateCtrl.acceptMatch);
  router
    .route('/decline_match')
    .post(authentication, isUserOrAdmin, officiateCtrl.declineMatch);
  router
    .route('/cancel_match')
    .post(authentication, isAdmin, officiateCtrl.cancelMatch);
  router
    .route('/remove_official')
    .delete(authentication, isAdmin, officiateCtrl.removeOfficialFromMatch);
}

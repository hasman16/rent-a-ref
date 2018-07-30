export default function officiateRoutes(setter, officiateCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const imageUploader = setter.imageUploader;

  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isUser = authorization.isUser;

  router
    .route('/referee/:user_id/schedule')
    .get(authentication, isUserOrAdmin, officiateCtrl.refereeSchedule);
  router
    .route('/match/:match_id/officials')
    .get(authentication, isUserOrAdmin, officiateCtrl.matchOfficials);

  router
    .route('/officials/match/:match_id')
    .get(authentication, isAdmin, officiateCtrl.officialsByMatch);

  router
    .route('/officiate/match')
    .post(authentication, isAdmin, officiateCtrl.addOfficialToMatch);

  router
    .route('/accept/match')
    .post(authentication, isUserOrAdmin, officiateCtrl.acceptMatch);

  router
    .route('/decline/match')
    .post(authentication, isUserOrAdmin, officiateCtrl.declineMatch);

  router
    .route('/cancel/match')
    .put(authentication, isAdmin, officiateCtrl.cancelMatch);
  router
    .route('/cancel/match')
    .patch(authentication, isAdmin, officiateCtrl.cancelMatch);
  router
    .route('/remove/official/:user_id/match/:match_id')
    .delete(authentication, isAdmin, officiateCtrl.removeOfficialFromMatch);
}

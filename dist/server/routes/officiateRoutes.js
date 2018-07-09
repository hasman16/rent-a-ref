"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function officiateRoutes(setter, officiateCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var imageUploader = setter.imageUploader;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isUser = authorization.isUser;
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
exports.default = officiateRoutes;
//# sourceMappingURL=officiateRoutes.js.map
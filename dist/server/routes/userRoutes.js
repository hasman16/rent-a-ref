"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userRoutes(setter, ctrls) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var imageUploader = setter.imageUploader;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isUser = authorization.isUser;
    var userCtrl = ctrls.userCtrl;
    var loginCtrl = ctrls.loginCtrl;
    var passwordCtrl = ctrls.passwordCtrl;
    var registerCtrl = ctrls.registerCtrl;
    router.route('/login').post(loginCtrl.login);
    router.route('/logout').post(userCtrl.logout);
    router.route('/users').get(authentication, isAdmin, userCtrl.getAll);
    router.route('/users').post(registerCtrl.registerUser);
    router.route('/register').post(registerCtrl.registerUser);
    router.use('/profile/:user_id', authentication, isUser);
    router.route('/profile/:user_id').get(registerCtrl.getProfile);
    //router.route('/profile/:user_id').get(authentication, isUser,registerCtrl.getProfile);
    router
        .route('/changepassword/:user_id')
        .put(authentication, isUser, passwordCtrl.changepassword);
    router
        .route('/changepassword/:user_id')
        .patch(authentication, isUser, passwordCtrl.changepassword);
    router.route('/forgotpassword').post(passwordCtrl.forgotpassword);
    router.route('/resetpassword').post(passwordCtrl.resetpassword);
    router.use('/users/:user_id', authentication, isUserOrAdmin);
    router.route('/users/:user_id').get(userCtrl.getOne);
    router.route('/users/:user_id').put(userCtrl.update);
    router.route('/users/:user_id').patch(userCtrl.update);
    router.route('/users/:user_id').delete(userCtrl.deleteOne);
    router
        .route('/schedule_by_referee/:user_id')
        .get(authentication, isUserOrAdmin, userCtrl.matchScheduleByUser);
    router
        .route('/officiate_match')
        .post(authentication, isAdmin, userCtrl.addOfficialToMatch);
    router
        .route('/remove_official')
        .delete(authentication, isAdmin, userCtrl.removeOfficialFromMatch);
    router
        .route('/upload_image/:user_id')
        .post(authentication, imageUploader.single('photo'), userCtrl.uploadImage);
}
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map
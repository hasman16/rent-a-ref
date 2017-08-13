"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userRoutes(setter, ctrls) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var userCtrl = ctrls.userCtrl;
    var loginCtrl = ctrls.loginCtrl;
    var registerCtrl = ctrls.registerCtrl;
    router.route('/login').post(loginCtrl.login);
    router.route('/logout').post(userCtrl.logout);
    router.route('/users').get(authentication, isAdmin, userCtrl.getAll);
    router.route('/users').post(registerCtrl.registerUser);
    router.route('/register').post(registerCtrl.registerUser);
    router.route('/users/:user_id').get(authentication, isUserOrAdmin, userCtrl.getOne);
    router.route('/users/:user_id').put(authentication, isUserOrAdmin, userCtrl.update);
    router.route('/users/:user_id').patch(authentication, isUserOrAdmin, userCtrl.update);
    router.route('/users/:user_id').delete(authentication, isUserOrAdmin, userCtrl.deleteOne);
}
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userRoutes(setter, userCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/login').post(userCtrl.login);
    router.route('/logout').post(userCtrl.logout);
    router.route('/user').get(authentication, authorization.isAdmin, userCtrl.getAll);
    router.route('/user').post(userCtrl.create);
    router.route('/register').post(userCtrl.create);
    router.route('/user/:id').get(authentication, authorization.isUserOrAdmin, userCtrl.getOne);
    router.route('/user/:id').put(authentication, authorization.isUserOrAdmin, userCtrl.update);
    router.route('/user/:id').delete(authentication, authorization.isUserOrAdmin, userCtrl.deleteOne);
}
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map
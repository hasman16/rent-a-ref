"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userRoutes(router, authentication, userCtrl) {
    router.route('/login').post(userCtrl.login);
    router.route('/logout').post(userCtrl.logout);
    router.route('/user').get(authentication, userCtrl.getAll);
    router.route('/user').post(authentication, userCtrl.create);
    router.route('/user/:id').get(authentication, userCtrl.getOne);
    router.route('/user/:id').put(authentication, userCtrl.update);
    router.route('/user/:id').delete(authentication, userCtrl.deleteOne);
}
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function phoneRoutes(setter, phoneCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    //const userPhone = 'user/:user_id/phone/:phone_id';
    router.route('/phone').get(authentication, isAdmin, phoneCtrl.getAll);
    router.route('/organization/:organization_id/phone').post(authentication, phoneCtrl.createByOrganization);
    router.route('/organization/:organization_id/phone').get(authentication, phoneCtrl.getByOrganization);
    router.route('/organization/:organization_id/phone/:phone_id').put(authentication, phoneCtrl.updateByOrganization);
    router.route('/organization/:organization_id/phone/:phone_id').delete(authentication, phoneCtrl.deleteByOrganization);
    router.route('/user/:user_id/phone').post(authentication, isUserOrAdmin, phoneCtrl.createByUser);
    router.route('/user/:user_id/phone').get(authentication, isUserOrAdmin, phoneCtrl.getByUser);
    router.route('/user/:user_id/phone/:phone_id').put(authentication, isUserOrAdmin, phoneCtrl.updateByUser);
    router.route('/user/:user_id/phone/:phone_id').delete(authentication, isUserOrAdmin, phoneCtrl.deleteByUser);
}
exports.default = phoneRoutes;
//# sourceMappingURL=phoneRoutes.js.map
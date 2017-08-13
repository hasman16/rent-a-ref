"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addressRoutes(setter, addressCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/addresses').get(authentication, isAdmin, addressCtrl.getAll);
    router.route('/organizations/:organization_id/addresses').post(authentication, addressCtrl.createByOrganization);
    router.route('/organizations/:organization_id/addresses').get(authentication, addressCtrl.getByOrganization);
    router.route('/organizations/:organization_id/addresses/:address_id').put(authentication, isOrgOwner, addressCtrl.updateByOrganization);
    router.route('/organizations/:organization_id/addresses/:address_id').patch(authentication, isOrgOwner, addressCtrl.updateByOrganization);
    router.route('/organizations/:organization_id/addresses/:address_id').delete(authentication, isOrgOwner, addressCtrl.deleteByOrganization);
    router.route('/users/:user_id/addresses').post(authentication, isUserOrAdmin, addressCtrl.createByUser);
    router.route('/users/:user_id/addresses').get(authentication, isUserOrAdmin, addressCtrl.getByUser);
    router.route('/users/:user_id/addresses/:address_id').put(authentication, isUserOrAdmin, addressCtrl.updateByUser);
    router.route('/users/:user_id/addresses/:address_id').patch(authentication, isUserOrAdmin, addressCtrl.updateByUser);
    router.route('/users/:user_id/addresses/:address_id').delete(authentication, isAdmin, addressCtrl.deleteByUser);
}
exports.default = addressRoutes;
//# sourceMappingURL=addressRoutes.js.map
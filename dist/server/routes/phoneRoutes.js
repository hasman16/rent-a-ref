"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function phoneRoutes(setter, phoneCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/phones').get(authentication, isAdmin, phoneCtrl.getAll);
    router.route('/organizations/:organization_id/phones').post(authentication, phoneCtrl.organizationCreatePhone);
    router.route('/organizations/:organization_id/phones/bulk').post(authentication, phoneCtrl.organizationBulkCreatePhones);
    router.route('/organizations/:organization_id/phones/bulk').put(authentication, isOrgOwner, phoneCtrl.organizationBulkUpdatePhones);
    router.route('/organizations/:organization_id/phones/bulk').patch(authentication, isOrgOwner, phoneCtrl.organizationBulkUpdatePhones);
    router.route('/organizations/:organization_id/phones').get(authentication, phoneCtrl.getByOrganization);
    router.route('/organizations/:organization_id/phones/:phone_id').put(authentication, isOrgOwner, phoneCtrl.updateByOrganization);
    router.route('/organizations/:organization_id/phones/:phone_id').patch(authentication, isOrgOwner, phoneCtrl.updateByOrganization);
    router.route('/organizations/:organization_id/phones/:phone_id').delete(authentication, isOrgOwner, phoneCtrl.deleteByOrganization);
    router.route('/users/:user_id/phones').post(authentication, isUserOrAdmin, phoneCtrl.userCreatePhone);
    router.route('/users/:user_id/phones/bulk').post(authentication, isUserOrAdmin, phoneCtrl.userBulkCreatePhones);
    router.route('/users/:user_id/phones/bulk').put(authentication, isUserOrAdmin, phoneCtrl.userBulkUpdatePhones);
    router.route('/users/:user_id/phones/bulk').patch(authentication, isUserOrAdmin, phoneCtrl.userBulkUpdatePhones);
    router.route('/users/:user_id/phones').get(authentication, isUserOrAdmin, phoneCtrl.getByUser);
    router.route('/users/:user_id/phones/:phone_id').put(authentication, isUserOrAdmin, phoneCtrl.updateByUser);
    router.route('/users/:user_id/phones/:phone_id').patch(authentication, isUserOrAdmin, phoneCtrl.updateByUser);
    router.route('/users/:user_id/phones/:phone_id').delete(authentication, isAdmin, phoneCtrl.deleteByUser);
}
exports.default = phoneRoutes;
//# sourceMappingURL=phoneRoutes.js.map
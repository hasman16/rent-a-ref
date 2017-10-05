"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function organizationRoutes(setter, organizationCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/organizers/:organization_id').get(authentication, organizationCtrl.getOrganizers);
    router.route('/organizations').get(authentication, organizationCtrl.getAll);
    router.route('/users/:user_id/organizations').get(authentication, organizationCtrl.getByUser);
    router.route('/organizations').post(authentication, organizationCtrl.create);
    router.route('/organizations/:organization_id').get(authentication, organizationCtrl.getOne);
    router.route('/organizations/:organization_id').put(authentication, isOrgOwner, organizationCtrl.update);
    router.route('/organizations/:organization_id').delete(authentication, isOrgOwner, organizationCtrl.deleteOne);
}
exports.default = organizationRoutes;
//# sourceMappingURL=organizationRoutes.js.map
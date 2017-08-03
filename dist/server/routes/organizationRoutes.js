"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function organizationRoutes(setter, organizationCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/organizer/:organization_id').get(authentication, organizationCtrl.getOrganizers);
    router.route('/organization').get(authentication, organizationCtrl.getAll);
    router.route('/organization').post(authentication, organizationCtrl.create);
    router.route('/organization/:organization_id').get(authentication, organizationCtrl.getOne);
    router.route('/organization/:organization_id').put(authentication, organizationCtrl.update);
    router.route('/organization/:organization_id').delete(authentication, organizationCtrl.deleteOne);
}
exports.default = organizationRoutes;
//# sourceMappingURL=organizationRoutes.js.map
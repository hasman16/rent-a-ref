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
    var imageUploader = setter.imageUploader;
    router
        .route('/organizers/:organization_id')
        .get(authentication, organizationCtrl.getOrganizers);
    router.route('/organizations').get(authentication, organizationCtrl.getAll);
    router
        .route('/users/:user_id/organizations')
        .get(authentication, organizationCtrl.getByUser);
    router.route('/organizations').post(authentication, organizationCtrl.create);
    router
        .route('/organizations/:organization_id')
        .get(authentication, organizationCtrl.getOne);
    router
        .route('/organizations/:organization_id')
        .put(authentication, isOrgOwner, organizationCtrl.update);
    router
        .route('/organizations/:organization_id')
        .delete(authentication, isOrgOwner, organizationCtrl.deleteOne);
    router
        .route('/make_payment/:organization_id')
        .post(authentication, organizationCtrl.makeStripePayment);
    router
        .route('/upload_logo/:organization_id')
        .post(authentication, imageUploader.single('photo'), organizationCtrl.uploadLogo);
}
exports.default = organizationRoutes;
//# sourceMappingURL=organizationRoutes.js.map
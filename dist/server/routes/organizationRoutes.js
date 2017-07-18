"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function organizationRoutes(setter, organizationCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/organization').get(authentication, organizationCtrl.getAll);
    router.route('/organization').post(authentication, organizationCtrl.create);
    router.route('/organization/:id').get(authentication, organizationCtrl.getOne);
    router.route('/organization/:id').put(authentication, organizationCtrl.update);
    router.route('/organization/:id').delete(authentication, organizationCtrl.deleteOne);
}
exports.default = organizationRoutes;
//# sourceMappingURL=organizationRoutes.js.map
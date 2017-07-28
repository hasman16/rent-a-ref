"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function phoneRoutes(setter, phoneCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var personPhone = 'person/person_id/phone/phone_id';
    router.route('/phone').get(authentication, isAdmin, phoneCtrl.getAll);
    router.route('/organization/:organization_id/phone').post(authentication, phoneCtrl.createByOrganization);
    //router.route('/organization/:organization_id/phone/phone_id').get(authentication, phoneCtrl.getByOrganization);
    router.route('/organization/:organization_id/phone/phone_id').put(authentication, phoneCtrl.updateByOrganization);
    router.route('/organization/:organization_id/phone/phone_id').delete(authentication, phoneCtrl.deleteByOrganization);
    router.route('/person/:person_id/phone').post(authentication, isUserOrAdmin, phoneCtrl.createByPerson);
    //router.route('/person/person_id/phone/phone_id').get(authentication, isUserOrAdmin, phoneCtrl.getByPerson);
    router.route('/person/person_id/phone/phone_id').put(authentication, isUserOrAdmin, phoneCtrl.updateByPerson);
    router.route('/person/person_id/phone/phone_id').delete(authentication, isUserOrAdmin, phoneCtrl.deleteByPerson);
}
exports.default = phoneRoutes;
//# sourceMappingURL=phoneRoutes.js.map
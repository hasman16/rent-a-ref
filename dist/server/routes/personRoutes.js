"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function personRoutes(setter, personCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    router.route('/people').get(authentication, isAdmin, personCtrl.getAll);
    router.route('/people/:person_id').get(authentication, personCtrl.getOne);
    router.route('/people/:person_id').put(authentication, isUserOrAdmin, personCtrl.update);
    router.route('/people/:person_id').patch(authentication, isUserOrAdmin, personCtrl.update);
    router.route('/people/:person_id').delete(authentication, isAdmin, personCtrl.deleteOne);
}
exports.default = personRoutes;
//# sourceMappingURL=personRoutes.js.map
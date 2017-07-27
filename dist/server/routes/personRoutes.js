"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function personRoutes(setter, personCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/person').get(authentication, personCtrl.getAll);
    router.route('/person/:id').get(authentication, personCtrl.getOne);
    router.route('/person/:id').put(authentication, authorization.isAdmin, personCtrl.update);
    router.route('/person/:id').delete(authentication, authorization.isAdmin, personCtrl.deleteOne);
}
exports.default = personRoutes;
//# sourceMappingURL=personRoutes.js.map
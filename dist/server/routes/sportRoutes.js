"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sportRoutes(setter, sportCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/sport').get(authentication, sportCtrl.getAll);
    router.route('/sport').post(authentication, authorization.isAdmin, sportCtrl.create);
    router.route('/sport/:sport_id').get(authentication, sportCtrl.getOne);
    router.route('/sport/:sport_id').put(authentication, authorization.isAdmin, sportCtrl.updateOne);
    router.route('/sport/:sport_id').delete(authentication, authorization.isAdmin, sportCtrl.deleteOne);
}
exports.default = sportRoutes;
//# sourceMappingURL=sportRoutes.js.map
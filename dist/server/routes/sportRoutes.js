"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sportRoutes(setter, sportCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/sports').get(authentication, sportCtrl.getAll);
    router.route('/sports').post(authentication, authorization.isAdmin, sportCtrl.create);
    router.use('/sports/:sport_id', authentication);
    router.route('/sports/:sport_id').get(sportCtrl.getOne);
    router.route('/sports/:sport_id').put(authorization.isAdmin, sportCtrl.updateOne);
    router.route('/sports/:sport_id').patch(authorization.isAdmin, sportCtrl.updateOne);
    router.route('/sports/:sport_id').delete(authorization.isAdmin, sportCtrl.deleteOne);
}
exports.default = sportRoutes;
//# sourceMappingURL=sportRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameRoutes(setter, gameCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    router.route('/game').get(authentication, gameCtrl.getAll);
    router.route('/game').post(authentication, gameCtrl.create);
    router.route('/game/:id').get(authentication, gameCtrl.getOne);
    router.route('/game/:id').put(authentication, gameCtrl.update);
    router.route('/game/:id').delete(authentication, gameCtrl.deleteOne);
}
exports.default = gameRoutes;
//# sourceMappingURL=gameRoutes.js.map
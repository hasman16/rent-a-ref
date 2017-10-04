"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameRoutes(setter, gameCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    router.route('/games').get(authentication, gameCtrl.getAll);
    router.route('/games').post(authentication, gameCtrl.create);
    router.route('/games/:game_id').get(authentication, gameCtrl.getOne);
    router.route('/games/:game_id').put(authentication, gameCtrl.update);
    router.route('/games/:game_id').patch(authentication, gameCtrl.update);
    router.route('/games/:game_id').delete(authentication, gameCtrl.deleteOne);
}
exports.default = gameRoutes;
//# sourceMappingURL=gameRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameRoutes(setter, gameCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/games').get(authentication, gameCtrl.getAll);
    router.route('/games').post(authentication, gameCtrl.create);
    router.route('/games/:game_id').get(authentication, gameCtrl.getOne);
    router.route('/games/:game_id').put(authentication, isOrgMember, gameCtrl.update);
    router.route('/games/:game_id').patch(authentication, isOrgMember, gameCtrl.update);
    router.route('/games/:game_id').delete(authentication, isOrgMember, gameCtrl.deleteOne);
    router.route('/games/:game_id/address').get(authentication, gameCtrl.getGameAddress);
    router.route('/organization/:organization_id/games').get(authentication, isOrgMember, gameCtrl.getAllByOrganization);
    router.route('/organization/:organization_id/games').post(authentication, isOrgMember, gameCtrl.createGameAddressPhone);
    router.use('/games/:game_id/address/address_id', authentication, isOrgMember, isUserOrAdmin);
    router.route('/games/:game_id/address/address_id').put(gameCtrl.updateGameAddress);
    router.route('/games/:game_id/address/address_id').patch(gameCtrl.updateGameAddress);
    router.route('/games/:game_id/address/address_id').delete(gameCtrl.deleteGameAddress);
    /*
        router.route('/games/:game_id/phone').get(authentication, gameCtrl.getGameAddress);
        router.route('/organization/:organization_id/game/phone').post(authentication, isOrgMember, gameCtrl.createGameAddress);
    
        router.use('/games/:game_id/phone/phone_id', authentication, isOrgMember, isUserOrAdmin);
        router.route('/games/:game_id/phone/phone_id').put(gameCtrl.updateGameAddress);
        router.route('/games/:game_id/phone/phone_id').patch(gameCtrl.updateGameAddress);
        router.route('/games/:game_id/phone/phone_id').delete(gameCtrl.deleteGameAddress);
        */
}
exports.default = gameRoutes;
//# sourceMappingURL=gameRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchRoutes(setter, matchCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/matches').get(authentication, matchCtrl.getAll);
    router.route('/matches').post(authentication, matchCtrl.create);
    router.route('/matches/:match_id').get(authentication, matchCtrl.getOne);
    router
        .route('/matches/:match_id')
        .put(authentication, isOrgMember, matchCtrl.update);
    router
        .route('/matches/:match_id')
        .patch(authentication, isOrgMember, matchCtrl.update);
    router
        .route('/matches/:match_id')
        .delete(authentication, isOrgMember, matchCtrl.deleteOne);
    router
        .route('/matches/:match_id/address')
        .get(authentication, matchCtrl.getMatchAddress);
    router
        .route('/games/:game_id/matches')
        .get(authentication, matchCtrl.getAllByGame);
    router
        .route('/games/:game_id/matches')
        .post(authentication, matchCtrl.createMatchAddressPhone);
    router.use('/matches/:match_id/address/address_id', authentication, isOrgMember, isUserOrAdmin);
    router
        .route('/matches/:match_id/address/address_id')
        .put(matchCtrl.updateMatchAddress);
    router
        .route('/matches/:match_id/address/address_id')
        .patch(matchCtrl.updateMatchAddress);
    router
        .route('/matches/:match_id/address/address_id')
        .delete(matchCtrl.deleteMatchAddress);
    //router.route('/prices').get(authentication, matchCtrl.getPrices);
    /*
    router.route('/matches/:match_id/phone').get(authentication, matchCtrl.getmatchAddress);
    router.route('/organization/:organization_id/match/phone').post(authentication, isOrgMember, matchCtrl.creatematchAddress);

    router.use('/matches/:match_id/phone/phone_id', authentication, isOrgMember, isUserOrAdmin);
    router.route('/matches/:match_id/phone/phone_id').put(matchCtrl.updatematchAddress);
    router.route('/matches/:match_id/phone/phone_id').patch(matchCtrl.updatematchAddress);
    router.route('/matches/:match_id/phone/phone_id').delete(matchCtrl.deletematchAddress);
    */
}
exports.default = matchRoutes;
//# sourceMappingURL=matchRoutes.js.map
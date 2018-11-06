"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function meetingRoutes(setter, meetingCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    router.route('/meetings').get(authentication, meetingCtrl.getAll);
    router.route('/meeting').post(authentication, meetingCtrl.create);
    router
        .route('/meeting/:meeting_id')
        .get(authentication, meetingCtrl.getOne);
    router
        .route('/meeting/:meeting_id')
        .put(authentication, isOrgMember, meetingCtrl.update);
    router
        .route('/meeting/:meeting_id')
        .patch(authentication, isOrgMember, meetingCtrl.update);
    router
        .route('/meeting/:meeting_id')
        .delete(authentication, isOrgMember, meetingCtrl.deleteOne);
    router
        .route('/meeting/:meeting_id/addresses')
        .get(authentication, meetingCtrl.getMeetingAddress);
    router
        .route('/organization/:organization_id/meetings')
        .get(authentication, isOrgMember, meetingCtrl.getAllByOrganization);
    router
        .route('/organization/:organization_id/meetings')
        .post(authentication, isOrgMember, meetingCtrl.createMeetingAddressPhone);
    router.use('/meeting/:meeting_id/addresses/:address_id', authentication, isOrgMember, isUserOrAdmin);
    router
        .route('/meeting/:meeting_id/addresses/:address_id')
        .put(meetingCtrl.updateMeetingAddress);
    router
        .route('/meeting/:meeting_id/addresses/:address_id')
        .patch(meetingCtrl.updateMeetingAddress);
    router
        .route('/meeting/:meeting_id/addresses/:address_id')
        .delete(meetingCtrl.deleteMeetingAddress);
    router.route('/prices').get(authentication, meetingCtrl.getPrices);
}
exports.default = meetingRoutes;
//# sourceMappingURL=meetingRoutes.js.map
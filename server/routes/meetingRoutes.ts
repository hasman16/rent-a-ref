export default function meetingRoutes(setter, meetingCtrl) {
	const router = setter.router;
	const authentication = setter.authentication;
	const authorization = setter.authorization;

	const uploads = setter.uploads;
	const isUserOrAdmin = authorization.isUserOrAdmin;
	const isAdmin = authorization.isAdmin;
	const isOrgOwner = authorization.isOrgOwner;
	const isOrgMember = authorization.isOrgMember;

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
		.post(
			authentication,
			isOrgMember,
			meetingCtrl.createMeetingAddressPhone
		);

	router.use(
		'/meeting/:meeting_id/addresses/:address_id',
		authentication,
		isOrgMember,
		isUserOrAdmin
	);
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

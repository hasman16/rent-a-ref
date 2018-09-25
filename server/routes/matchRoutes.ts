export default function matchRoutes(setter, matchCtrl) {
	const router = setter.router;
	const authentication = setter.authentication;
	const authorization = setter.authorization;

	const uploads = setter.uploads;
	const isUserOrAdmin = authorization.isUserOrAdmin;
	const isAdmin = authorization.isAdmin;
	const isOrgOwner = authorization.isOrgOwner;
	const isOrgMember = authorization.isOrgMember;

	router.route('/matches').get(authentication, matchCtrl.getAll);
	router.route('/matches').post(authentication, matchCtrl.create);
	router.route('/matches/:match_id').get(authentication, matchCtrl.getOne);
	router
		.route('/matches/:match_id')
		.put(authentication, isAdmin, matchCtrl.update);
	router
		.route('/matches/:match_id')
		.patch(authentication, isAdmin, matchCtrl.update);
	router
		.route('/matches/:match_id')
		.delete(authentication, isAdmin, matchCtrl.deleteOne);

	router
		.route('/matches/:match_id/address')
		.get(authentication, matchCtrl.getMatchAddress);
	router
		.route('/meeting/:meeting_id/matches')
		.get(authentication, matchCtrl.getAllByMeeting);
	router
		.route('/meeting/:meeting_id/matches')
		.post(authentication, matchCtrl.createMatchAddressPhone);

	router.use(
		'/matches/:match_id/address/:address_id',
		authentication,
		isOrgMember,
		isUserOrAdmin
	);
	router
		.route('/matches/:match_id/address/:address_id')
		.put(matchCtrl.updateMatchAddress);
	router
		.route('/matches/:match_id/address/:address_id')
		.patch(matchCtrl.updateMatchAddress);
	router
		.route('/matches/:match_id/address/:address_id')
		.delete(matchCtrl.deleteMatchAddress);
}

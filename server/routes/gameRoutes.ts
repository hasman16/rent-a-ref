export default function gameRoutes(setter, gameCtrl) {
	const router = setter.router;
	const authentication = setter.authentication;
	const authorization = setter.authorization;

	const uploads = setter.uploads;
	const isUserOrAdmin = authorization.isUserOrAdmin;
	const isAdmin = authorization.isAdmin;
	const isOrgOwner = authorization.isOrgOwner;
	const isOrgMember = authorization.isOrgMember;

	router.route('/games').get(authentication, gameCtrl.getAll);
	router.route('/games').post(authentication, gameCtrl.create);
	router.route('/games/:game_id').get(authentication, gameCtrl.getOne);
	router.route('/games/:game_id').put(authentication, isOrgMember, gameCtrl.update);
	router.route('/games/:game_id').patch(authentication, isOrgMember, gameCtrl.update);
	router.route('/games/:game_id').delete(authentication, isOrgMember, gameCtrl.deleteOne);

	router.route('/game/:game_id/address').get(authentication, gameCtrl.getGameAddress);
	router.route('/organization/:organization_id/game').post(authentication, isOrgMember, gameCtrl.createGameAddressPhone);

	router.use('/game/:game_id/address/address_id', authentication, isOrgMember, isUserOrAdmin);
	router.route('/game/:game_id/address/address_id').put(gameCtrl.updateGameAddress);
	router.route('/game/:game_id/address/address_id').patch(gameCtrl.updateGameAddress);
	router.route('/game/:game_id/address/address_id').delete(gameCtrl.deleteGameAddress);

/*
	router.route('/game/:game_id/phone').get(authentication, gameCtrl.getGameAddress);
	router.route('/organization/:organization_id/game/phone').post(authentication, isOrgMember, gameCtrl.createGameAddress);

	router.use('/game/:game_id/phone/phone_id', authentication, isOrgMember, isUserOrAdmin);
	router.route('/game/:game_id/phone/phone_id').put(gameCtrl.updateGameAddress);
	router.route('/game/:game_id/phone/phone_id').patch(gameCtrl.updateGameAddress);
	router.route('/game/:game_id/phone/phone_id').delete(gameCtrl.deleteGameAddress);
	*/
}

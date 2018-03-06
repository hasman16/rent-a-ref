/*export * from './addressController';
export * from './areaController';
export * from './blogController';
export * from './gameController';
export * from './organizationController';
export * from './passwordController';
export * from './personController';
export * from './phoneController';
export * from './sportController';
export * from './userController';

export * from './loginController';
export * from './registerController';

import AddressController from './addressController';
import * as _ from 'lodash';

export default function ControllerFactory(bcrypt, jwt, models, responseService, SendGridService) {
			    console.log('xxxxxxControllerFactory baseTable:', models.Phone);
	function getController(name: string):any {
		let result:any={};
		switch(_.toLower(name)) {
			case 'address':
			    console.log('ControllerFactory baseTable:', models.Address);

			result = new AddressController();
			result.init(models, responseService);
			break
			default:
			result = {};
			break
		}

		return result;
	}

	return {
    	getController
  	}
}

*/
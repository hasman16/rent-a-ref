import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface GameModel {
	id?: string;
	name: string;
	duration: number;
	referees: number;
	ages: string;
	pay: number;
	address_id?: number;
	organization_id?: number;
	phone_id?: number;
	sport_id?: number;
	address?: AddressModel;
	phone?: PhoneModel;
}

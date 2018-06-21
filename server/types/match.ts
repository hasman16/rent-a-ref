import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface MatchModel {
	id?: string;
	name: string;
	match_date?: string;
	venue_name?: string;
	status?: string;
	age: string;
	game_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: AddressModel;
	phone?: PhoneModel;
}

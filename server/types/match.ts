import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface MatchModel {
	id?: string;
	match_name?: string;
	date?: string;
	time?: string;
	timezone?: number;
	timezone_name?: string;
	venue_name?: string;
	status?: string;
	age?: string;
	referees?: number;
	game_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: AddressModel;
	phone?: PhoneModel;
}

import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface MatchModel {
	id?: string;
	match_name?: string;
	duration?: number;
	periods?: number;
	date?: string;
	time?: string;
	timezone_id?: string;
	timezone?: number;
	timezone_name?: string;
	timezone_offset?: string;
	venue_name?: string;
	status?: string;
	age?: string;
	referees?: number;
	meeting_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: AddressModel;
	phone?: PhoneModel;
}

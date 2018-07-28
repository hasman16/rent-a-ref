import { Address } from './address';
import { Phone } from './phone';

export interface Match {
	id?: string;
	match_name?: string;
	date?: string;
	time?: string;
	timezone?: number;
	timezone_id?: string;
	timezone_name?: string;
	referees?: number;
	venue_name?: string;
	status?: string;
	age?: string;
	game_id?: number;
	sport_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: Address;
	phone?: Phone;
}

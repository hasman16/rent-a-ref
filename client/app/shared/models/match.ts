import { Address } from './address';
import { Phone } from './phone';

export interface Match {
	id?: string;
	match_name?: string;
	match_date?: number;
	timezone?: number;
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

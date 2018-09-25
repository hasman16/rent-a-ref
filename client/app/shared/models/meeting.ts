import { Address } from './address';
import { Phone } from './phone';

export interface Meeting {
	id?: string;
	event_name?: string;
	start_date?: string;
	end_date?: string;
	start_time?: string;
	end_time?: string;
	timezone?: number;
	timezone_id?: string;
	timezone_name?: string;
	venue_name?: string;
	status?: string;
	kids_games?: number;
	teen_games?: number;
	adult_games?: number;
	kids_game_price?: number;
	teen_game_price?: number;
	adult_game_price?: number;
	organization_id?: number;
	user_id?: number;
	sport_id?: number;
	address_id?: number;
	phone_id?: number;
	address?: Address;
	phone?: Phone;
}

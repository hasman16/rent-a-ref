import { Address } from './address';
import { Phone } from './phone';

export interface Game {
	id?: string;
	event_name?: string;
	event_date?: string;
	venue_name?: string;
	kids_referees?: number;
	teens_referees?: number;
	adults_referees?: number;
	kids_ref_pay?: number;
	teens_ref_pay?: number;
	adults_ref_pay?: number;
	organization_id?: number;
	user_id?: number;
	sport_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: Address;
	phone?: Phone;
}

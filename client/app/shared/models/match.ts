import { Address } from './address';
import { Phone } from './phone';

export interface Match {
	id?: string;
	match_name?: string;
	duration?: number;
	periods?: number;
	date?: string;
	time?: string;
	timezone?: number;
	timezone_id?: string;
	timezone_name?: string;
	referees?: number;
	venue_name?: string;
	status?: string;
	age?: string;
	meeting_id?: number;
	sport_id?: number;
	address_id?: string;
	phone_id?: string;
	address?: Address;
	phone?: Phone;
}

export enum Positions {
	Center = 0,
	AssistantRef1 = 1,
	AssistantRef2 = 2,
	FourthOfficial = 3
}

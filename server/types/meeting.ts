import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface MeetingModel {
	id?: string;
	event_name?: string;
	start_date?: string;
	end_date?: string;
	start_time?: string;
	end_time?: string;
	timezone_id: string;
	timezone?: number;
	timezone_name?: string;
	venue_name?: string;
	status?: string;
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
	address?: AddressModel;
	phone?: PhoneModel;
}

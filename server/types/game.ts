import { IAddress } from './address';
import { IPhone } from './phone';

export interface IGame {
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
	address?: IAddress;
	phone?: IPhone;
}

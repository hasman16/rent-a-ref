import { Address } from './address';
import { Person } from './person';
import { Phone } from './phone';

export interface Profile{
	id?: number;
	email: string;
	authorization: number;
	can_referee: string;
	can_organize: string;
	status: string;
	person: Person;
	addresses: Address[];
	areas: Address[];
	phones: Phone[]
}
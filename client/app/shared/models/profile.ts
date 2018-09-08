import { BaseModel } from './base';
import { Address } from './address';
import { Organization } from './organization';
import { Person } from './person';
import { Phone } from './phone';

export interface Profile extends BaseModel {
	email: string;
	authorization: number;
	can_referee: string;
	can_organize: string;
	status: string;
	person: Person;
	addresses: Address[];
	areas: Address[];
	phones: Phone[];
	organizations: Organization[];
}

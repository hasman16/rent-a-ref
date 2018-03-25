import { AddressModel } from './address';
import { OrganizationModel } from './organization';
import { PersonModel } from './person';
import { PhoneModel } from './phone';

export interface IProfileModel{
	id?: number;
	email: string;
	authorization: number;
	can_referee: string;
	can_organize: string;
	status: string;
	person: PersonModel;
	addresses: AddressModel[];
	areas: AddressModel[];
	phones: PhoneModel[];
	organizations: OrganizationModel[]
}
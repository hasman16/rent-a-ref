import { IAddress } from './address';
import { IOrganization } from './organization';
import { IPerson } from './person';
import { IPhone } from './phone';

export interface IProfile{
	id?: number;
	email: string;
	authorization: number;
	can_referee: string;
	can_organize: string;
	status: string;
	person: IPerson;
	addresses: IAddress[];
	areas: IAddress[];
	phones: IPhone[];
	organizations: IOrganization[]
}
import { AddressModel } from './address';

export interface MatchModel {
	id?: string;
	name: string;
	duration: number;
	type: string;
	age: string;
	address: AddressModel[]
}
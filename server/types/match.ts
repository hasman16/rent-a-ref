import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface MatchModel {
	id?: string;
	name: string;
	duration: number;
	type: string;
	age: string;
	game_id: string;
	address: AddressModel[];
	phone?: PhoneModel;
}

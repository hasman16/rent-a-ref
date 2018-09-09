import { BaseModel } from './base';

export interface Bio extends BaseModel {
	firstname: string;
	middlenames: string;
	lastname: string;
	dob: string;
	gender: string;
}

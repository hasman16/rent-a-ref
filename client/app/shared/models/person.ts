import { BaseModel } from './base';

export interface Person extends BaseModel {
	firstname:string;
	middlenames:string;
	lastname:string;
	gender:string;
	dob:string;
	user_id:number
}
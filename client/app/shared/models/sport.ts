import {BaseModel} from './base';

export interface Sport extends BaseModel{
	duration: number;
	name: string;
	periods: number;
	referees: number;
}
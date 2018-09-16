import { BaseModel } from './base';

export interface Officiating extends BaseModel {
	status?: string;
	position?: number;
	match_id?: number;
}

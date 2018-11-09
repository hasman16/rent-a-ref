import { BaseModel } from './base';

export interface Officiating extends BaseModel {
	status?: string;
	pay?: number;
	position?: number;
	match_id?: number;
}

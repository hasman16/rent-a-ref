import { BaseModel } from './base';

export interface Comment extends BaseModel {
	content: string;
	username: string;
	email: string;
}

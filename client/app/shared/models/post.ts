import { BaseModel } from './base';

export interface Post extends BaseModel {
	content: string;
	published?: boolean;
}

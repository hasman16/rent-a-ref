import { User } from './user';
import { BaseModel } from './base';

export interface Login extends BaseModel {
	success: boolean;
	message: string;
	token: string;
	user: User;
}

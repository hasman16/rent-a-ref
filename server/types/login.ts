import { UserModel } from './user'

export interface LoginModel {
	success: boolean;
	message: string;
	token: string;
	user: UserModel;
}
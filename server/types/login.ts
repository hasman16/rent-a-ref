import { IUser } from './user'

export interface ILogin {
	success: boolean;
	message: string;
	token: string;
	user: IUser;
}
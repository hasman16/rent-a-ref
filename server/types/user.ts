export interface IUser {
  id?: string;
  email: string;
  authorization?: string;
  firstname?: string;
  lastname?: string;
  role?:string;
  person_id?: string;
  can_referee: string;
  can_organize: string;
  status: string,
  captcha?: any
}
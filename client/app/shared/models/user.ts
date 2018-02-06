export interface User {
  id?: string;
  email: string;
  accessLevel?: string;
  authorization?: string;
  firstname?: string;
  lastname?: string;
  role?:string;
  person_id?: string;
  can_referee: string;
  can_organize: string;
  status: string
}
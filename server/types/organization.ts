import { IAddress } from './address';
import { IPhone } from './phone';

export interface IOrganization {
  id?: string;
  name: string;
  addresses?: IAddress[];
  phones?: IPhone[];
}

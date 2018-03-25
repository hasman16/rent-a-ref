import { AddressModel } from './address';
import { PhoneModel } from './phone';

export interface OrganizationModel {
  id?: string;
  name: string;
  addresses?: AddressModel[];
  phones?: PhoneModel[];
}

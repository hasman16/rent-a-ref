import { Address } from './address';
import { Phone } from './phone';

export interface Organization {
  id?: string;
  address: Address;
  phoneModel: Phone;
}

import { Address } from './address';
import { Phone } from './phone';

export interface Organization {
  id?: string;
  name: string;
  addresses?: Address[];
  phones?: Phone[];
}

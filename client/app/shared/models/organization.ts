import { BaseModel } from './base';
import { Address } from './address';
import { Phone } from './phone';

export interface Organization extends BaseModel {
  name: string;
  addresses?: Address[];
  phones?: Phone[];
}

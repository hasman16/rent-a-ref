import {BaseModel} from './base';

export interface Address extends BaseModel {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  radius?: string;
}

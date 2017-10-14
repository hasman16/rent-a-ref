import {BaseModel} from './baseModel';

export class AddressType extends BaseModel {
  line1: string = '';
  line2: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  radius: string = '';
}

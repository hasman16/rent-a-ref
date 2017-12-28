import { AddressModel } from './addressModel';
import { PhoneModel } from './phoneModel';

export class OrganizationModel {
  id: string;
  address: AddressModel;
  phoneModel: PhoneModel;

  constructor(data = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = '0';
    }
  }
}

export class AddressType {
  id: string;
  line1: string = '';
  line2: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  radius: string = '';
  constructor(data = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = '0';
    }
  }
}

export class PhoneType {
  id: string;
  number: string = '';
  description: string = '';
  constructor(data = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = '0';
    }
  }
}

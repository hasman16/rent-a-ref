export class BioType {
  id: string;
  firstname: string = '';
  middlenames: string = '';
  lastname: string = '';
  dob: string = '';
  gender: string = '';
  constructor(data = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = '0';
    }
  }
}

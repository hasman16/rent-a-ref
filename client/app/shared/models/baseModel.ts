export abstract class BaseModel {
  id: string;

  constructor(data = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = '0';
    }
  }
}

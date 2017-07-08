import BaseCtrl from './base';

export default class PersonCtrl extends BaseCtrl {
  model = null;

  constructor(Person: any) {
    super();
    this.model = Person;
  }
  
}

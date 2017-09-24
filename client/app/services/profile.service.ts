import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import _ from "lodash";

@Injectable()
export class ProfileService {
  private data; //  { id: '', email: '', person: [], addresses: []};
  private person; // = { id: ''};
  private addresses = [];
  private areas = [];
  private phones = [];

  constructor(private userService: UserService) {

  }

  getData() {
    return _.clone(this.data);
  }

  getPerson() {
    return _.cloneDeep(this.person);
  }

  getAddresses() {
    return _.cloneDeep(this.addresses);
  }

  getAreas() {
    return _.cloneDeep(this.areas);
  }

  getPhones() {
    return _.cloneDeep(this.phones);
  }

  getProfile(user_id: any) {
    return this.userService.getProfile(user_id)
      .map((res) => {
        this.data = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;
        this.areas = res.areas;
        return res;
      });
  }
}

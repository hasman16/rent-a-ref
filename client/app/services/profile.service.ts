import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {
  private data = { id: '', email: '', person: [], addresses: []};
  private person = { id: ''};
  private addresses = [];
  private phones = [];

  constructor(private userService: UserService) {

  }

  getData() {
    return this.data;
  }

  getPerson() {
    return this.person;
  }

  getAddresses() {
    return this.addresses;
  }

  getPhones() {
    return this.phones;
  }

  getProfile(user_id:any) {
    return this.userService.getProfile(user_id)
      .map((res) => {
        this.data = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;
        return res;
      });
  }
}

import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import _ from "lodash";
import { AddressType } from "./../shared/models/addressType";
import { BioType } from "./../shared/models/bioType";
import { PhoneType } from "./../shared/models/phoneType";

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

  getPerson():BioType {
    return _.cloneDeep(this.person);
  }

  getAddresses():Array<AddressType> {
    return _.cloneDeep(this.addresses);
  }

  getAreas():Array<any> {
    return _.cloneDeep(this.areas);
  }

  getPhones():Array<PhoneType> {
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

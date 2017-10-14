import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import { AddressType } from './../shared/models/addressType';
import { BioType } from './../shared/models/bioType';
import { PhoneType } from './../shared/models/phoneType';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ProfileService {
  private data;
  private person;
  private addresses = [];
  private areas = [];
  private phones = [];

  constructor(private userService: UserService) {

  }

  getData() {
    return _.cloneDeep(this.data);
  }

  getPerson(): BioType {
    return _.cloneDeep(this.person);
  }

  getAddresses(): Array<AddressType> {
    return _.cloneDeep(this.addresses);
  }

  getAreas(): Array<any> {
    return _.cloneDeep(this.areas);
  }

  getPhones(): Array<PhoneType> {
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

  createAddress(newAddress: AddressType): Observable<any> {
    return this.userService.createAddress(newAddress, this.data.id);
  }

  updateAddress(newAddress: AddressType): Observable<any> {
    return this.userService.updateAddress(newAddress, this.data.id, newAddress.id);
  }

  createPhone(newPhone: PhoneType): Observable<any> {
    return this.userService.createPhone(newPhone, this.data.id);
  }

  updatePhone(newPhone: PhoneType): Observable<any> {
    return this.userService.updatePhone(newPhone, this.data.id, newPhone.id);
  }
}

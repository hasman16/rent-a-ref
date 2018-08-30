import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import {
  Address,
  Bio,
  Phone,
  Person,
  Profile
} from './../../shared/models/index';

import { IAddressService } from './../../shared/forms/address-form/address-form.component';
import { IPhoneService } from './../../shared/forms/phone-form/phone-form.component';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable()
export class ProfileService implements IAddressService, IPhoneService {
  private data: Profile;
  private person: Person;
  private addresses: Address[];
  private areas: Address[];
  private phones: Phone[];

  constructor(private userService: UserService) {
    this.addresses = [];
    this.phones = [];
    this.areas = [];
  }

  getData() {
    return _.cloneDeep(this.data);
  }

  getPerson(): Bio {
    return _.cloneDeep(this.person);
  }

  getAddresses(): Address[] {
    return _.cloneDeep(this.addresses);
  }

  getAreas(): Address[] {
    return _.cloneDeep(this.areas);
  }

  getPhones(): Phone[] {
    return _.cloneDeep(this.phones);
  }

  getProfile(user_id: any) {
    return this.userService.getProfile(user_id).pipe(
      map(res => {
        this.data = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;
        this.areas = res.areas;
        return res;
      })
    );
  }

  createAddress(newAddress: Address): Observable<Address> {
    return this.userService.createAddress(newAddress, this.data.id);
  }

  updateAddress(newAddress: Address): Observable<Address> {
    return this.userService.updateAddress(
      newAddress,
      this.data.id,
      newAddress.id
    );
  }

  createPhone(newPhone: Phone): Observable<Phone> {
    return this.userService.createPhone(newPhone, this.data.id);
  }

  updatePhone(newPhone: Phone): Observable<Phone> {
    return this.userService.updatePhone(newPhone, this.data.id, newPhone.id);
  }
}

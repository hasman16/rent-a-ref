import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import { AddressModel } from './../shared/models/addressModel';
import { BioModel } from './../shared/models/bioModel';
import { PhoneModel } from './../shared/models/phoneModel';

import { IAddressService } from '../shared/forms/address-form/address-form.component';
import { IPhoneService } from './../shared/forms/phone-form/phone-form.component'

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ProfileService implements IAddressService, IPhoneService {
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

  getPerson(): BioModel {
    return _.cloneDeep(this.person);
  }

  getAddresses(): Array<AddressModel> {
    return _.cloneDeep(this.addresses);
  }

  getAreas(): Array<any> {
    return _.cloneDeep(this.areas);
  }

  getPhones(): Array<PhoneModel> {
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

  createAddress(newAddress: AddressModel): Observable<any> {
    return this.userService.createAddress(newAddress, this.data.id);
  }

  updateAddress(newAddress: AddressModel): Observable<any> {
    return this.userService.updateAddress(newAddress, this.data.id, newAddress.id);
  }

  createPhone(newPhone: PhoneModel): Observable<any> {
    return this.userService.createPhone(newPhone, this.data.id);
  }

  updatePhone(newPhone: PhoneModel): Observable<any> {
    return this.userService.updatePhone(newPhone, this.data.id, newPhone.id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address, Bio, Phone, Person, Profile } from './../shared/models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

@Injectable()
export class OrganizeService {

  private data;
  private addresses: Address[];
  private phones: Phone[];

  constructor(private http: HttpClient) {
    this.addresses =[];
    this.phones = [];
  }

  getData() {
    return _.cloneDeep(this.data);
  }

  getAddresses(): Address[] {
    return _.cloneDeep(this.addresses);
  }

  getPhones(): Phone[] {
    return _.cloneDeep(this.phones);
  }

  // addresses
  getOrgAddresses(Organization_id: any): Observable<any> {
    console.log('Fetching Address');
    return this.http.get(`/api/organizations/${Organization_id}/addresses`);
  }

  getOrgAddress(org_id: any, add_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/addresses/${add_id}`);
  }
  // Phones
  getOrgPhones(Organization_id: any): Observable<any> {
    console.log('Fetching Phones');
    return this.http.get(`/api/organizations/${Organization_id}/phones`);
  }

  getOrgPhone(org_id: any, phone_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/phones/${phone_id}`);
  }
  // Create an Organization
  createOrganization(information): Observable<any> {
    return this.http.post(`/api/organizations`, JSON.stringify(information));
  }

  updateOrganization(information, Organization_id): Observable<any> {
    return this.http.put(`/api/organizations/${Organization_id}`, JSON.stringify(information));
  }

  getAllOrganizations(): Observable<any> {
    return this.http.get(`/api/organizations`);
  }

  getOrganization(organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${organization_id}`);
  }

  getUserOrganization(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/organizations`);
  }

  createAddress(newAddress: any, org_id: any): Observable<any> {
    return this.http.post(`/api/organizations/${org_id}/addresses`, JSON.stringify(newAddress));
  }

  updateAddress(information, org_id, add_id): Observable<any> {
    return this.http.put(`/api/organizations/${org_id}/addresses/${add_id}`, JSON.stringify(information));
  }

  updateAddresses(information, org_id): Observable<any> {
    return this.http.put(`/api/organizations/${org_id}/addresses`, JSON.stringify(information));
  }

  createPhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(`/api/organizations/${org_id}/phones`, JSON.stringify(newPhone));
  }

  updatePhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(`/api/organizations/${org_id}/phones`, JSON.stringify(newPhone));
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TokenService } from './token.service';
import 'rxjs/add/operator/map';
import { Address } from './../shared/models/address';
import { Bio } from './../shared/models/bio';
import { Phone } from './../shared/models/phone';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { UserService } from './user.service';

@Injectable()
export class OrganizeService {

  private data;
  private addresses: Address[];
  private phones: Phone[];

  constructor(private http: Http, private tokenService: TokenService, private userService: UserService) {
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
    return this.http.get(`/api/organizations/${Organization_id}/addresses`, this.tokenService.getOptions()).map(res => res.json());
  }

  getOrgAddress(org_id: any, add_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/addresses/${add_id}`, this.tokenService.getOptions()).map(res => res.json());
  }
  // Phones
  getOrgPhones(Organization_id: any): Observable<any> {
    console.log('Fetching Phones');
    return this.http.get(`/api/organizations/${Organization_id}/phones`, this.tokenService.getOptions()).map(res => res.json());
  }

  getOrgPhone(org_id: any, phone_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/phones/${phone_id}`, this.tokenService.getOptions()).map(res => res.json());
  }
  // Create an Organization
  createOrganization(information): Observable<any> {
    return this.http.post(`/api/organizations`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updateOrganization(information, Organization_id): Observable<any> {
    return this.http.put(`/api/organizations/${Organization_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  getAllOrganizations(): Observable<any> {
    return this.http.get(`/api/organizations`, this.tokenService.getOptions()).map(res => res.json());
  }

  getOrganization(organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${organization_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserOrganization(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/organizations`, this.tokenService.getOptions()).map(res => res.json());
  }

  createAddress(newAddress: any, org_id: any): Observable<any> {
    // return this.userService.createAddress(newAddress, this.data.id);
    return this.http.post(`/api/organizations/${org_id}/addresses`, JSON.stringify(newAddress), this.tokenService.getOptions());
  }

  updateAddress(information, org_id, add_id): Observable<any> {
    return this.http.put(`/api/organizations/${org_id}/addresses/${add_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updateAddresses(information, org_id): Observable<any> {
    return this.http.put(`/api/organizations/${org_id}/addresses`, JSON.stringify(information), this.tokenService.getOptions());
  }

  createPhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(`/api/organizations/${org_id}/phones`, JSON.stringify(newPhone), this.tokenService.getOptions());
  }

  updatePhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(`/api/organizations/${org_id}/phones`, JSON.stringify(newPhone), this.tokenService.getOptions());
  }
}

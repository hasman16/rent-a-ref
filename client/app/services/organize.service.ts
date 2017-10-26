import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TokenService } from './token.service';
import 'rxjs/add/operator/map';
import { AddressModel } from './../shared/models/addressModel';
import { BioModel } from './../shared/models/bioModel';
import { PhoneModel } from './../shared/models/phoneModel';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import { UserService } from './user.service';

@Injectable()
export class OrganizeService {

  private data;
  private addresses = [];
  private phones = [];

  constructor(private http: Http, private tokenService: TokenService, private userService: UserService) {

  }

  getData() {
    return _.cloneDeep(this.data);
  }

  getAddresses(): Array<AddressModel> {
    return _.cloneDeep(this.addresses);
  }

  getPhones(): Array<PhoneModel> {
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

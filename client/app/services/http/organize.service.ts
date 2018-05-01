import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Address,
  BaseModel,
  Bio,
  Phone,
  Person,
  PagedData,
  Profile,
  Sport
} from './../../shared/models/index';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import * as _ from 'lodash';

@Injectable()
export class OrganizeService {
  private data;
  private addresses: Address[];
  private phones: Phone[];
  private sportsData: PagedData;

  constructor(private http: HttpClient) {
    this.addresses = [];
    this.phones = [];
    this.sportsData = <PagedData>{};
  }

  uploadLogo(Organization_id, data): Observable<any>{
    return this.http.post(`/api/upload_logo/${Organization_id}`, data);
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

  getSports(queryParams: any = null): Observable<PagedData> {
    let ob: Observable<PagedData>;

    if (!_.isArray(this.sportsData.rows) || this.sportsData.rows.length === 0) {
      ob = this.http
        .get<PagedData>(`/api/sports`, {
          params: queryParams
        })
        .do(
          (sportsData: PagedData) => (this.sportsData = _.cloneDeep(sportsData))
        );
    } else {
      let bs: BehaviorSubject<PagedData> = new BehaviorSubject<PagedData>(null);
      bs.next(_.cloneDeep(this.sportsData));
      ob = bs;
    }

    return ob.take(1);
  }

  // addresses
  getOrgAddresses(Organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${Organization_id}/addresses`);
  }

  getOrgAddress(org_id: any, add_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/addresses/${add_id}`);
  }
  // Phones
  getOrgPhones(Organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${Organization_id}/phones`);
  }

  getOrgPhone(org_id: any, phone_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/phones/${phone_id}`);
  }
  // Create an Organization
  createOrganization(information): Observable<any> {
    return this.http.post(`/api/organizations`, JSON.stringify(information));
  }

  updateOrganization(information, Organization_id): Observable<Address> {
    return this.http.put<Address>(
      `/api/organizations/${Organization_id}`,
      JSON.stringify(information)
    );
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
    return this.http.post(
      `/api/organizations/${org_id}/addresses`,
      JSON.stringify(newAddress)
    );
  }

  updateAddress(information, org_id, add_id): Observable<any> {
    return this.http.put(
      `/api/organizations/${org_id}/addresses/${add_id}`,
      JSON.stringify(information)
    );
  }

  updateAddresses(information, org_id): Observable<any> {
    return this.http.put(
      `/api/organizations/${org_id}/addresses`,
      JSON.stringify(information)
    );
  }

  createPhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(
      `/api/organizations/${org_id}/phones`,
      JSON.stringify(newPhone)
    );
  }

  updatePhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(
      `/api/organizations/${org_id}/phones`,
      JSON.stringify(newPhone)
    );
  }

  //----------------------------------------------------------------------------------------------------
  bulkCreate<T extends BaseModel>([url, model, indexName]: [
    string,
    any,
    string
  ]): Observable<T[]> {
    return this.http.post(url, JSON.stringify(model)).map((res: any) => {
      return <T[]>res[indexName];
    });
  }

  bulkUpdate<T extends BaseModel>([url, model, indexName]: [
    string,
    any,
    string
  ]): Observable<T[]> {
    return this.http.put(url, JSON.stringify(model)).map((res: any) => {
      return <T[]>res[indexName];
    });
  }

  bulkAddress(addresses: Address[], org_id): [string, any, string] {
    const model: any = { addresses };
    const url: string = `/api/organizations/${org_id}/addresses/bulk`;

    return [url, model, 'addresses'];
  }

  bulkCreateAddresses(
    addresses: Address[],
    org_id: any
  ): Observable<Address[]> {
    return this.bulkCreate<Address>(this.bulkAddress(addresses, org_id));
  }

  bulkUpdateAddresses(
    addresses: Address[],
    org_id: any
  ): Observable<Address[]> {
    return this.bulkUpdate<Address>(this.bulkAddress(addresses, org_id));
  }

  bulkPhone(phones: Phone[], org_id): [string, any, string] {
    const model: any = { phones };
    const url: string = `/api/organizations/${org_id}/phones/bulk`;

    return [url, model, 'phones'];
  }

  bulkCreatePhones(phones: Phone[], org_id): Observable<Phone[]> {
    return this.bulkCreate<Phone>(this.bulkPhone(phones, org_id));
  }

  bulkUpdatePhones(phones: Phone[], org_id): Observable<Phone[]> {
    return this.bulkUpdate<Phone>(this.bulkPhone(phones, org_id));
  }

  makeStripePayment(org_id, payload): Observable<any> {
    return this.http.post(
      `/api/make_payment/${org_id}`,
      JSON.stringify(payload)
    );
  }
}

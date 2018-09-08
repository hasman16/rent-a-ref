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
import { AbstractService } from './abstract.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable()
export class OrganizeService extends AbstractService {
  private data;
  private addresses: Address[];
  private phones: Phone[];
  private sportsData: PagedData;

  constructor(protected http: HttpClient) {
    super(http);
    this.addresses = [];
    this.phones = [];
    this.sportsData = <PagedData>{};
  }

  public getData() {
    return _.cloneDeep(this.data);
  }

  public getAddresses(): Address[] {
    return _.cloneDeep(this.addresses);
  }

  public getPhones(): Phone[] {
    return _.cloneDeep(this.phones);
  }

  public getSports(queryParams: any = null): Observable<PagedData> {
    let ob: Observable<PagedData>;

    if (!_.isArray(this.sportsData.rows) || this.sportsData.rows.length === 0) {
      ob = this.http
        .get<PagedData>(`/api/sports`, {
          params: queryParams
        })
        .pipe(
          tap(
            (sportsData: PagedData) =>
              (this.sportsData = _.cloneDeep(sportsData))
          )
        );
    } else {
      const bs: BehaviorSubject<PagedData> = new BehaviorSubject<PagedData>(
        null
      );
      bs.next(_.cloneDeep(this.sportsData));
      ob = bs;
    }

    return ob.pipe(take(1));
  }

  // addresses
  public getOrgAddresses(Organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${Organization_id}/addresses`);
  }

  public getOrgAddress(org_id: any, add_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/addresses/${add_id}`);
  }
  // Phones
  public getOrgPhones(Organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${Organization_id}/phones`);
  }

  public getOrgPhone(org_id: any, phone_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${org_id}/phones/${phone_id}`);
  }
  // Create an Organization
  public createOrganization(information): Observable<any> {
    return this.http.post(`/api/organizations`, JSON.stringify(information));
  }

  public updateOrganization(information, Organization_id): Observable<Address> {
    return this.http.put<Address>(
      `/api/organizations/${Organization_id}`,
      JSON.stringify(information)
    );
  }

  public getAllOrganizations(): Observable<any> {
    return this.http.get(`/api/organizations`);
  }

  public getOrganization(organization_id: any): Observable<any> {
    return this.http.get(`/api/organizations/${organization_id}`);
  }

  public getUserOrganization(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/organizations`);
  }

  public createAddress(newAddress: any, org_id: any): Observable<any> {
    return this.http.post(
      `/api/organizations/${org_id}/addresses`,
      JSON.stringify(newAddress)
    );
  }

  public updateAddress(information, org_id, add_id): Observable<any> {
    return this.http.put(
      `/api/organizations/${org_id}/addresses/${add_id}`,
      JSON.stringify(information)
    );
  }

  public updateAddresses(information, org_id): Observable<any> {
    return this.http.put(
      `/api/organizations/${org_id}/addresses`,
      JSON.stringify(information)
    );
  }

  public createPhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(
      `/api/organizations/${org_id}/phones`,
      JSON.stringify(newPhone)
    );
  }

  public updatePhone(newPhone: any, org_id): Observable<any> {
    return this.http.post(
      `/api/organizations/${org_id}/phones`,
      JSON.stringify(newPhone)
    );
  }

  public deleteOrganization(organization_id: string): Observable<any> {
    return this.http.delete<any>(`/api/organizations/${organization_id}`);
  }

  //----------------------------------------------------------------------------------------------------

  public bulkAddress(addresses: Address[], org_id): [string, any, string] {
    const model: any = { addresses };
    const url: string = `/api/organizations/${org_id}/addresses/bulk`;

    return [url, model, 'addresses'];
  }

  public bulkCreateAddresses(
    addresses: Address[],
    org_id: any
  ): Observable<Address[]> {
    return this.bulkCreate<Address>(this.bulkAddress(addresses, org_id));
  }

  public bulkUpdateAddresses(
    addresses: Address[],
    org_id: any
  ): Observable<Address[]> {
    return this.bulkUpdate<Address>(this.bulkAddress(addresses, org_id));
  }

  public bulkPhone(phones: Phone[], org_id): [string, any, string] {
    const model: any = { phones };
    const url: string = `/api/organizations/${org_id}/phones/bulk`;

    return [url, model, 'phones'];
  }

  public bulkCreatePhones(phones: Phone[], org_id): Observable<Phone[]> {
    return this.bulkCreate<Phone>(this.bulkPhone(phones, org_id));
  }

  public bulkUpdatePhones(phones: Phone[], org_id): Observable<Phone[]> {
    return this.bulkUpdate<Phone>(this.bulkPhone(phones, org_id));
  }
}

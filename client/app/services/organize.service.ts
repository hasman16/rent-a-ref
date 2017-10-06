import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TokenService } from './token.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizeService {

  private org_data = { id: '', name: '' };

  constructor(private http: Http, private tokenService: TokenService) {

  }

  getData() {
    return this.org_data;
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

}

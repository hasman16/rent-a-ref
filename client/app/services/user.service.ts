import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TokenService } from './token.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http, private tokenService: TokenService) { }

  register(user): Observable<any> {
    return this.http.post('/api/register', JSON.stringify(user), this.tokenService.getOptions()).map(res => res.json());
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.tokenService.getOptions());
  }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users`).map(res => res.json());
  }

  resetpassword(credentials): Observable<any> {
    return this.http.post('/api/resetpassword', JSON.stringify(credentials), this.tokenService.getOptions());
  }

  forgotpassword(email): Observable<any> {
    return this.http.post('/api/forgotpassword', JSON.stringify(email), this.tokenService.getOptions());
  }

  changepassword(passwords, user_id): Observable<any> {
    return this.http.put(`/api/changepassword/${user_id}`, JSON.stringify(passwords), this.tokenService.getOptions());
  }

  getUser(user_id: any): Observable<any> {

    return this.http.get(`/api/users/${user_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/users/${user.id}`, JSON.stringify(user), this.tokenService.getOptions());
  }

  deleteUser(user_id: number): Observable<any> {
    return this.http.delete(`/api/users/${user_id}`, this.tokenService.getOptions());
  }

  getProfile(user_id: any): Observable<any> {
    return this.http.get(`/api/profile/${user_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  getPerson(person_id: any): Observable<any> {
    return this.http.get(`/api/people/${person_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  updatePerson(information, person_id): Observable<any> {
    return this.http.put(`/api/people/${person_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  //Zones
  createZone(information, user_id): Observable<any> {
    return this.http.post(`/api/user/${user_id}/location_preference`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updateZone(information, zone_id: any): Observable<any> {
    return this.http.put(`/api/location_preference/${zone_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  //Payments
  updatePayment(information, user): Observable<any> {
    return this.http.put(`/api/payment/${user.id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  //addresses
  getUserAddresses(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/addresses`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserAddress(user_id: any, address_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/addresses/${address_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  createAddress(information, user_id): Observable<any> {
    return this.http.post(`/api/users/${user_id}/addresses`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updateAddress(information, user_id, address_id): Observable<any> {
    return this.http.put(`/api/users/${user_id}/addresses/${address_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  //Phones
  getUserPhones(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/phones`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserPhone(user_id: any, phone_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}/phones/${phone_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  createPhone(information, user_id): Observable<any> {
    return this.http.post(`/api/users/${user_id}/phones`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updatePhone(information, user_id, phone_id): Observable<any> {
    return this.http.put(`/api/users/${user_id}/phones/${phone_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  // Create an Organization
  createOrganization(information, user_id): Observable<any> {
    return this.http.post(`/api/organization/${user_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  updateOrganization(information, Organization_id): Observable<any> {
    return this.http.put(`/api/organization/${Organization_id}`, JSON.stringify(information), this.tokenService.getOptions());
  }

  getOrganization(user_id: any): Observable<any> {
    return this.http.get(`/api/organization/${user_id}`, this.tokenService.getOptions()).map(res => res.json());
  }
}

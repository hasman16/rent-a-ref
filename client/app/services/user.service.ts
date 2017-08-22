import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TokenService } from '../services/token.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http, private tokenService:TokenService) { }


  register(user): Observable<any> {
    /*return this.http.post(`/api/register`, JSON.stringify(user), this.options).map(res => res.json());
    // return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post(`/api/login`, JSON.stringify(credentials), this.options);*/

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

  changepassword(passwords, user): Observable<any> {
    return this.http.put(`/api/changepassword/${user.id}`, JSON.stringify(passwords), this.tokenService.getOptions());
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

  getPerson(user_id: any): Observable<any> {

    return this.http.get(`/api/people/${user_id}`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserAddress(user_id: any): Observable<any> {

    return this.http.get(`/api/users/${user_id}/addresses`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserAddress_id(user_id: any, addressId: any): Observable<any> {

    return this.http.get(`/api/users/${user_id}/addresses/${addressId}`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserPhone(user_id: any): Observable<any> {

    return this.http.get(`/api/users/${user_id}/phones`, this.tokenService.getOptions()).map(res => res.json());
  }

  getUserPhone_id(user_id: any, phoneId: any): Observable<any> {

    return this.http.get(`/api/users/${user_id}/phones/${phoneId}`, this.tokenService.getOptions()).map(res => res.json());
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getOptions() {
    return this.options;
  }

  setOptions(token) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('charset', 'UTF-8');
    if (token) {
      this.headers.append('Authorization', 'Bearer ' + token);
    }
    this.options = new RequestOptions({ headers: this.headers });
  }

  register(user): Observable<any> {
    /*return this.http.post(`/api/register`, JSON.stringify(user), this.options).map(res => res.json());
    // return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post(`/api/login`, JSON.stringify(credentials), this.options);*/

    return this.http.post('/api/register', JSON.stringify(user), this.getOptions()).map(res => res.json());
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.getOptions());

  }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users`).map(res => res.json());
  }

  countUsers(): Observable<any> {
    return this.http.get(`/api/users/count`).map(res => res.json());
  }

  addUser(user): Observable<any> {

    /*return this.http.post(`/api/users`, JSON.stringify(user), this.options);
  }

  getUser(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}`).map(res => res.json());
    // return this.http.get(`/api/user/${user._id}`).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/users/${user.id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user_id: any): Observable<any> {
    return this.http.delete(`/api/users/${user_id}`, this.options);*/

    return this.http.post('/api/users', JSON.stringify(user), this.getOptions());
  }

  getUser(user_id: any): Observable<any> {
    return this.http.get(`/api/users/${user_id}`, this.getOptions()).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/users/${user.id}`, JSON.stringify(user), this.getOptions());
  }

  deleteUser(user_id: number): Observable<any> {
    return this.http.delete(`/api/users/${user_id}`, this.getOptions());

  }

}

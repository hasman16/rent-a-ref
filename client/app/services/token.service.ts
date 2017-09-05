import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TokenService {
  private token;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor() { }

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
}

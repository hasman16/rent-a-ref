import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { BaseModel } from './../../shared/models/index';

export abstract class AbstractService {
  constructor(protected http: HttpClient) {}

  protected postData<T extends BaseModel>(
    url: string,
    data: any
  ): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(data));
  }

  protected putData<T extends BaseModel>(
    url: string,
    data: any
  ): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(data));
  }

  protected bulkCreate<T extends BaseModel>([url, model, indexName]: [
    string,
    any,
    string
  ]): Observable<T[]> {
    return this.http.post(url, JSON.stringify(model)).map((res: any) => {
      return <T[]>res[indexName];
    });
  }

  protected bulkUpdate<T extends BaseModel>([url, model, indexName]: [
    string,
    any,
    string
  ]): Observable<T[]> {
    return this.http.put(url, JSON.stringify(model)).map((res: any) => {
      return <T[]>res[indexName];
    });
  }
}

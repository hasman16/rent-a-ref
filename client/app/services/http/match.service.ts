import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  Address,
  BaseModel,
  Game,
  Match,
  PagedData,
  Phone
} from './../../shared/models/index';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

@Injectable()
export class MatchService {
  private address: Address;
  private phones: Phone;
  public matches$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  public getMatches(): Observable<any> {
    return this.http.get<any>(`/api/prices`);
  }

  public getAllMatches(queryParams: any = null): Observable<PagedData> {
    return <Observable<PagedData>>this.http.get(`/api/matches`, {
      params: queryParams
    });
  }

  public getMatch(match_id: string): Observable<any> {
    return this.http.get(`/api/matches/${match_id}`);
  }

  public getGameMatches(game_id: string): Observable<Match[]> {
    const url = `/api/games/${game_id}/matches`;
    return this.http.get<Match[]>(url);
  }

  public createMatch(game_id, match): Observable<Match> {
    const url = `/api/games/${game_id}/matches`;
    return this.postData(url, match);
  }

  public updateMatch(match): Observable<Match> {
    const url: string = `/api/matches/${match.id}`;
    return this.putData(url, match);
  }

  public createAddress(match_id: string, address: Address): Observable<Match> {
    const url: string = `/api/matches/${match_id}/addresses`;
    return this.postData(url, address);
  }

  public updateAddress(match_id: string, address: Address): Observable<Match> {
    const url: string = `/api/matches/${match_id}/addresses/${address.id}`;
    return this.putData(url, address);
  }

  public createPhone(match_id: string, phone: Phone): Observable<Match> {
    const url: string = `/api/matches/${match_id}/phones`;
    return this.postData(url, phone);
  }

  public updatePhone(match_id: string, phone: Phone): Observable<Match> {
    const url: string = `/api/matches/${match_id}/phones/${phone.id}`;
    return this.putData(url, phone);
  }

  public postData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(data));
  }

  public putData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(data));
  }
}

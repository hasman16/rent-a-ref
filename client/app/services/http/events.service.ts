import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  Address,
  BaseModel,
  Game,
  PagedData,
  Phone
} from './../../shared/models/index';

import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class EventsService {
  private address: Address;
  private phones: Phone;

  constructor(private http: HttpClient) {}

  public getPrices(): Observable<any> {
    return this.http.get<any>(`/api/prices`);
  }

  public getAllGames(queryParams: any = null): Observable<PagedData> {
    return <Observable<PagedData>>this.http.get(`/api/games`, {
      params: queryParams
    });
  }

  public getGame(game_id: string): Observable<Game> {
    return this.http.get(`/api/games/${game_id}`);
  }

  public getOrganizationGames(organization_id: string): Observable<Game[]> {
    const url = `/api/organization/${organization_id}/games`;
    return this.http.get<Game[]>(url);
  }

  public createGame(organization_id, game): Observable<Game> {
    const url = `/api/organization/${organization_id}/games`;
    return this.postData(url, game);
  }

  public updateGame(game): Observable<Game> {
    const url: string = `/api/games/${game.id}`;
    return this.putData(url, game);
  }

  public createAddress(game_id: string, address: Address): Observable<Game> {
    const url: string = `/api/games/${game_id}/addresses`;
    return this.postData(url, address);
  }

  public updateAddress(game_id: string, address: Address): Observable<Game> {
    const url: string = `/api/games/${game_id}/addresses/${address.id}`;
    return this.putData(url, address);
  }

  public createPhone(game_id: string, phone: Phone): Observable<Game> {
    const url: string = `/api/games/${game_id}/phones`;
    return this.postData(url, phone);
  }

  public updatePhone(game_id: string, phone: Phone): Observable<Game> {
    const url: string = `/api/games/${game_id}/phones/${phone.id}`;
    return this.putData(url, phone);
  }

  public postData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(data));
  }

  public putData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(data));
  }
}

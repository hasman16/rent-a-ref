import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  Address,
  BaseModel,
  Game,
  PagedData,
  Phone
} from './../../shared/models/index';
import { AbstractService } from './abstract.service';

import { Observable } from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class EventsService extends AbstractService {
  private address: Address;
  private phones: Phone;

  constructor(protected http: HttpClient) {
    super(http);
  }

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

  public getOrganizationGames(
    organization_id: string,
    queryParams: any = null
  ): Observable<PagedData> {
    const url = `/api/organization/${organization_id}/games`;
    return this.http.get<PagedData>(url, {
      params: queryParams
    });
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

  public deleteEvent(game_id: string): Observable<any> {
    const url: string = `/api/games/${game_id}`;
    return <Observable<any>>this.http.delete(url);
  }
}

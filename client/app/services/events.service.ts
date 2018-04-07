import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address, BaseModel, Game, Phone } from './../shared/models/index';

import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class EventsService {
  private address: Address;
  private phones: Phone;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games`);
  }

  getGame(game_id: string): Observable<Game> {
    return this.http.get(`/api/games/${game_id}`);
  }

  getOrganizationGames(organization_id: string): Observable<Game[]> {
    const url = `/api/organization/${organization_id}/games`;
    return this.http.get<Game[]>(url);
  }

  createGame(organization_id, game): Observable<Game> {
    const url = `/api/organization/${organization_id}/games`;
    return this.postData(url, game);
  }

  updateGame(game): Observable<Game> {
    const url: string = `/api/games/${game.id}`;
    return this.putData(url, game);
  }

  createAddress(game_id: string, address: Address): Observable<Game> {
    const url: string = `/api/games/${game_id}/addresses`;
    return this.postData(url, address);
  }

  updateAddress(game_id: string, address: Address): Observable<Game> {
    const url: string = `/api/games/${game_id}/addresses/${address.id}`;
    return this.putData(url, address);
  }

  createPhone(game_id: string, phone: Phone): Observable<Game> {
    const url: string = `/api/games/${game_id}/phones`;
    return this.postData(url, phone);
  }

  updatePhone(game_id: string, phone: Phone): Observable<Game> {
    const url: string = `/api/games/${game_id}/phones/${phone.id}`;
    return this.putData(url, phone);
  }

  postData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(data));
  }

  putData<T extends BaseModel>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(data));
  }
}

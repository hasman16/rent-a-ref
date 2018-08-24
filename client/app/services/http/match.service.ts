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
import { AbstractService } from './abstract.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

@Injectable()
export class MatchService extends AbstractService {
  private address: Address;
  private phones: Phone;
  public matches$: Subject<any> = new Subject<any>();

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getAllMatches(queryParams: any = null): Observable<PagedData> {
    return <Observable<PagedData>>this.http.get(`/api/matches`, {
      params: queryParams
    });
  }

  public getAllMatchesByGame(
    game_id: string,
    queryParams: any = null
  ): Observable<PagedData> {
    const url = `/api/games/${game_id}/matches`;
    return <Observable<PagedData>>this.http.get(url, {
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

  public deleteMatch(match_id: string): Observable<any> {
    return this.http.delete<any>(`/api/matches/${match_id}`);
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

  public scheduleByReferee(
    user_id,
    queryParams: any = null
  ): Observable<PagedData> {
    const url = `/api/referee/${user_id}/schedule`;
    return <Observable<PagedData>>this.http
      .get(url, {
        params: queryParams
      })
      .map((data: PagedData) => {
        data.rows = _.map(data.rows, match => {
          const officials: any[] = _.map(match.users, user => {
            return user.officiating;
          });

          const statuses: string[] = _.map(
            officials,
            official => official.status
          );

          if (_.some(statuses, status => status === 'cancelled')) {
            match.status = 'cancelled';
          } else if (_.some(statuses, status => status === 'played')) {
            match.status = 'played';
          }

          match.users = _.cloneDeep(officials);

          return match;
        });

        return data;
      });
  }

  public getOfficialsByMatch(
    match_id: string,
    queryParams: any = null
  ): Observable<any> {
    const url: string = `/api/officials/match/${match_id}`;
    return <Observable<PagedData>>this.http.get(url, {
      params: queryParams
    });
  }

  public getMatchOfficials(
    match_id: string,
    queryParams: any = null
  ): Observable<any> {
    const url: string = `/api/match/${match_id}/officials`;
    return <Observable<PagedData>>this.http.get(url, {
      params: queryParams
    });
  }

  public officiateMatch(assignment): Observable<any> {
    const url = `/api/officiate/match`;
    return this.postData(url, assignment);
  }

  public removeOfficial(user_id, match_id): Observable<any> {
    const url = `/api/remove/official/${user_id}/match/${match_id}`;
    return this.http.delete(url);
  }

  public acceptMatch(assignment): Observable<any> {
    const url = `/api/accept/match`;
    return this.postData(url, assignment);
  }

  public declineMatch(assignment): Observable<any> {
    const url = `/api/decline/match`;
    return this.postData(url, assignment);
  }

  public cancelMatch(assignment): Observable<any> {
    const url = `/api/cancel/match`;
    return this.putData(url, assignment);
  }
}

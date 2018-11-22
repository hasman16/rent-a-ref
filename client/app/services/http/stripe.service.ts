import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BaseModel, Order, PagedData } from './../../shared/models/index';

import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class StripeService extends AbstractService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public createStripeOrder(order: Order): Observable<any> {
    return this.http.post(`/api/stripe/create_order`, JSON.stringify(order));
  }

  public createAndPayOrder(order): Observable<any> {
    return this.http.post(
      `/api/stripe/create_pay_order`,
      JSON.stringify(order)
    );
  }

  public getProducts(): Observable<any> {
    return this.http.get(`/api/stripe/products`);
  }

  public getPlans(): Observable<any> {
    return this.http.get(`/api/stripe/plans`);
  }

  public getProductsAndPlans(): Observable<any> {
    return this.http.get(`/api/stripe/products_and_plans`);
  }

  public makeStripePayment(org_id, payload): Observable<any> {
    return this.http.post(
      `/api/stripe/make_payment/${org_id}`,
      JSON.stringify(payload)
    );
  }

  public retrieveCustomer(user_id: string): Observable<any> {
    return this.http.get(`/api/stripe/customer/${user_id}`);
  }

  public payOrderWithOldCard(order: Order): Observable<any> {
    return this.http.post(
      `/api/stripe/pay_with_old_card`,
      JSON.stringify(order)
    );
  }

  public payOrderWithNewCard(order: Order): Observable<any> {
    return this.http.post(
      `/api/stripe/pay_with_new_card`,
      JSON.stringify(order)
    );
  }
}

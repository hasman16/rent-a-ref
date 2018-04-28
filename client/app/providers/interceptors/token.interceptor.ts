//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from './../../services/index';
import { LoaderService } from './../../shared/loader/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private loaderService: LoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newRequest = request.clone({
      headers: this.tokenService.getHeaders()
    });
    this.loaderService.show();

    return next.handle(newRequest).do(
      (event: HttpEvent<any>) => {
        this.loaderService.hide();
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      (err: any) => {
        this.loaderService.hide();
        if (err instanceof HttpErrorResponse) {
          if (
            err.status === 401 &&
            _.toLower(err.statusText) === 'unauthorized'
          ) {
            // redirect to the login route
            // or show a modal
            console.log('redirecting to logout');
            this.router.navigate(['logout']);
          }
        }
      }
    );
  }
}

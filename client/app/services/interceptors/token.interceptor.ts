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
import { TokenService } from './token.service';
import { LoaderService } from './../../shared/loader/index';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
			headers: this.tokenService.getHeaders(request.url)
		});
		this.loaderService.show();

		return next.handle(newRequest).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					this.loaderService.hide();
				}
				return event;
			}),
			catchError(
				(err: any): Observable<any> => {
					this.loaderService.hide();
					if (err instanceof HttpErrorResponse) {
						if (
							err.status === 401 &&
							_.toLower(err.statusText) === 'unauthorized'
						) {
							this.router.navigateByUrl('/logout');
						}
					}
					return observableThrowError(err);
				}
			)
		);
	}
}

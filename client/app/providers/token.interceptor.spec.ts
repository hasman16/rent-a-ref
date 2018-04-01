import { TestBed } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController
} from '@angular/common/http/testing';
import { UserService, TokenService } from './../services/index';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('TokenInterceptor', () => {
	let service: UserService;
	let tokenService: TokenService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				UserService,
				TokenService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: TokenInterceptor,
					multi: true
				}
			]
		});

		service = TestBed.get(UserService);
		tokenService = TestBed.get(TokenService);
		tokenService.setOptions('12345ABCDE');
		httpMock = TestBed.get(HttpTestingController);
	});

	it('should add an Authorization header', () => {
		service.getUsers().subscribe(response => {
			expect(response).toBeTruthy();
		});

		const httpRequest = httpMock.expectOne(`/api/users`);

		expect(httpRequest.request.headers.has('Authorization'));
		expect(httpRequest.request.headers.get('Authorization')).toBe(
			'Bearer 12345ABCDE'
		);
	});

	it('should content-type set to json', () => {
		service.getUsers().subscribe(response => {
			expect(response).toBeTruthy();
		});

		const httpRequest = httpMock.expectOne(`/api/users`);

		expect(httpRequest.request.headers.has('Content-Type'));
		expect(httpRequest.request.headers.get('Content-Type')).toBe(
			'application/json'
		);
	});

	it('should charset set to UTF-8', () => {
		service.getUsers().subscribe(response => {
			expect(response).toBeTruthy();
		});

		const httpRequest = httpMock.expectOne(`/api/users`);

		expect(httpRequest.request.headers.has('charset'));
		expect(httpRequest.request.headers.get('charset')).toBe('UTF-8');
	});
});

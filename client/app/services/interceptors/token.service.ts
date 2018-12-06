import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class TokenService {
	private token: string;
	private headers = new Headers({
		'Content-Type': 'application/json',
		charset: 'UTF-8'
	});
	private options = new RequestOptions({ headers: this.headers });

	constructor() {}

	getOptions() {
		return this.options;
	}

	getUploadHeaders(): HttpHeaders {
		return new HttpHeaders().set('charset', 'UTF-8');
	}

	getJsonHeaders(): HttpHeaders {
		return new HttpHeaders()
			.set('Content-Type', 'application/json')
			.append('charset', 'UTF-8');
	}

	getHeaders(url): HttpHeaders {
		const isUpload: boolean = /upload/gi.test(url);
		let headers: HttpHeaders = isUpload
			? this.getUploadHeaders()
			: this.getJsonHeaders();

		if (this.token) {
			headers = headers.append('Authorization', 'Bearer ' + this.token);
		}
		return headers;
	}

	getToken(): string {
		return this.token;
	}

	setOptions(token) {
		this.token = token;
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('charset', 'UTF-8');
		if (token) {
			this.headers.append('Authorization', 'Bearer ' + token);
		}
		this.options = new RequestOptions({ headers: this.headers });
	}
}

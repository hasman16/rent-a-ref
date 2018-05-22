import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadState, CropImageState } from './crop-image';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import * as _ from 'lodash';

@Injectable()
export class CropImageModalService {
	private modalSubject = new Subject<boolean>();
	private cropImageSubject = new Subject<CropImageState>();

	public modalState$ = this.modalSubject.asObservable();
	public cropImageSubject$ = this.cropImageSubject.asObservable();
	public organization_id: any;

	constructor(private http: HttpClient) {}

	public show() {
		this.modalSubject.next(true);
	}

	public hide() {
		this.modalSubject.next(false);
	}

	public message(cropImageState: CropImageState) {
		this.cropImageSubject.next(cropImageState);
	}

	public uploadImage(
		destination: string,
		formData: FormData
	): Observable<any> {
		return this.http.post(destination, formData, { reportProgress: true });
	}
}

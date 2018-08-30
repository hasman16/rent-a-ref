import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadState, CropImageState } from './crop-image';
import { Subject ,  Observable ,  BehaviorSubject } from 'rxjs';




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

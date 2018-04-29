import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CropImageModalService {
	private modalSubject = new Subject<boolean>();

	public modalState$ = this.modalSubject.asObservable();

	constructor() {}

	public show() {
		this.modalSubject.next(true);
		console.log('CropImageModalService.show');
	}

	public hide() {
		this.modalSubject.next(true);
	}
}

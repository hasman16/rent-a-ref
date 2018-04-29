import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ModalState } from './modal';

@Injectable()
export class ModalService {
	private modalSubject = new Subject<ModalState>();

	public modalState$ = this.modalSubject.asObservable();

	constructor() {}

	show() {
		console.log('ModalService.show');
		this.modalSubject.next(<ModalState>{ show: true });
	}

	hide() {
		this.modalSubject.next(<ModalState>{ show: false });
	}
}

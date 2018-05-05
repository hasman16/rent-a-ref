import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ModalState } from './modal';

@Injectable()
export class ModalService {
	private modalSubject = new Subject<ModalState>();
	private modals: Set<string> = new Set();

	public modalState$ = this.modalSubject.asObservable();

	constructor() {}

	show(name: string = '') {
		this.modalSubject.next(<ModalState>{ show: true, name });
	}

	hide(name: string = '') {
		this.modalSubject.next(<ModalState>{ show: false, name });
	}
}

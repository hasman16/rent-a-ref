import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Toast } from './toast';

@Injectable()
export class ToastService {
	private toastSubject = new Subject<Toast>();

	public toasts = this.toastSubject.asObservable();

	constructor() {}

	message(toast: Toast) {
		this.toastSubject.next(toast);
	}
}

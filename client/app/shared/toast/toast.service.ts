import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from './toast';

@Injectable()
export class ToastService {
	private toastSubject: Subject<Toast> = new Subject<Toast>();

	public toasts: Observable<Toast> = this.toastSubject.asObservable();

	constructor() {}

	public message(toast: Toast): void {
		this.toastSubject.next(toast);
	}
}

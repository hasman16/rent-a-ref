import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertState, AlertButtonState } from './alert-state';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertModalService {
	private modalSubject: Subject<boolean> = new Subject<boolean>();
	private alertSubject: Subject<AlertState> = new Subject<AlertState>();

	public modalState$: Observable<boolean> = this.modalSubject.asObservable();
	public alertSubject$: Observable<
		AlertState
	> = this.alertSubject.asObservable();

	constructor(private http: HttpClient) {}

	public show() {
		this.modalSubject.next(true);
	}

	public hide() {
		this.modalSubject.next(false);
	}

	public message(alertState: AlertState) {
		this.alertSubject.next(alertState);
	}
}

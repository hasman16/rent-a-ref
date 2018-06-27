import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertState, AlertButtonState } from './alert-state';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertModalService {
	private modalSubject = new Subject<boolean>();
	private alertSubject = new Subject<AlertState>();

	public modalState$ = this.modalSubject.asObservable();
	public alertSubject$ = this.alertSubject.asObservable();

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

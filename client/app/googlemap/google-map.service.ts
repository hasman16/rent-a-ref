import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

@Injectable()
export class GoogleMapService {
	private LIMIT: number = 10;

	private originSubject: Subject<any> = new Subject<any>();
	private destinationSubject: Subject<any> = new Subject<any>();

	public originState$: Observable<any> = this.originSubject.asObservable();
	public destinationState$: Observable<
		any
	> = this.destinationSubject.asObservable();

	constructor() {}

	setDestination(address): void {
		this.destinationSubject.next(address);
	}

	setOrigin(address): void {
		this.originSubject.next(address);
	}
}

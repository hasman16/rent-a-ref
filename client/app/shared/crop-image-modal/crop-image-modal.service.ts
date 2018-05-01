import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CropImageModalService {
	private modalSubject = new Subject<boolean>();

	public modalState$ = this.modalSubject.asObservable();
	public organization_id: any;

	constructor() {}

	public show() {
		this.modalSubject.next(true);
		console.log('CropImageModalService.show');
	}

	public hide() {
		this.modalSubject.next(true);
	}

	public setOrganizationId(organization_id) {
		this.organization_id = organization_id;
	}
}

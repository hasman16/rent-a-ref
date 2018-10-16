import {
	Component,
	EventEmitter,
	OnInit,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { ModalComponent } from './../../../shared/modal/modal.component';
import * as _ from 'lodash';

@Component({
	selector: 'referee-details-modal',
	templateUrl: './referee-details.component.html',
	styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsModalComponent implements OnInit {
	@ViewChild('refereeDetails') refereeDetailsModal: ModalComponent;
	@Input('show')
	set show(value) {
		if (value) {
			this.refereeDetailsModal.showModal(null);
		} else {
			this.refereeDetailsModal.hideModal(null);
		}
	}
	@Input() referee;
	@Output('hide')
	hideEmitter: EventEmitter<boolean> = new EventEmitter(false);
	public title: string = 'Referee Details';
	public submitText: string = 'Ok';
	public cancelText: string = '';
	public visible: boolean = false;
	public size: string = 'medium';
	public defaultImage: string = 'assets/images/avatar2.png';

	constructor() {}

	ngOnInit() {}

	public hide(): void {
		this.visible = false;
		this.hideEmitter.emit(false);
	}

	public closeModal(): void {
		this.hide(null);
	}

	public submitModal(): void {
		this.hide(null);
	}

	private hasProperty(referee, property): boolean {
		let result = _.has(referee, property);
		let arr = _.get(referee, property);
		return result && _.isArray(arr) && arr.length > 0;
	}

	public hasPhones(referee): boolean {
		return this.hasProperty(referee, 'orderedPhones');
	}

	public hasAddresses(referee): boolean {
		return this.hasProperty(referee, 'addresses');
	}
}

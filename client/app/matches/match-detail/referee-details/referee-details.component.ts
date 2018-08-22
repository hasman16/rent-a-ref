import {
	Component,
	EventEmitter,
	OnInit,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { ModalComponent } from './../../../shared/modal/modal.component';

@Component({
	selector: 'referee-details-modal',
	templateUrl: './referee-details.component.html',
	styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsModalComponent implements OnInit {
	@ViewChild('refereeDetails') refereeDetailsModal: ModalComponent;
	@Input('show')
	set show(value) {
		console.log('value:', value);
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

	hide(event): void {
		this.visible = false;
		this.hideEmitter.emit(false);
	}

	public closeModal($event): void {
		this.hide(null);
	}

	public submitModal($event): void {
		this.hide(null);
	}
}

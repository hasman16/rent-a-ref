import {
	Component,
	EventEmitter,
	OnInit,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { ModalComponent } from './../../shared/modal/modal.component';

@Component({
	selector: 'terms-modal',
	templateUrl: './terms.component.html',
	styleUrls: []
})
export class TermsModalComponent implements OnInit {
	@ViewChild('terms') termsModal: ModalComponent;
	@Input('show')
	set show(value) {
		if (value) {
			this.termsModal.showModal(null);
		} else {
			this.termsModal.hideModal(null);
		}
	}
	@Output('hide')
	hideEmitter: EventEmitter<boolean> = new EventEmitter(false);
	public title: string = 'Rend-A-Ref Terms and Conditions';
	public submitText: string = 'Ok';
	public visible: boolean = false;
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

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
	selector: 'privacy-modal',
	templateUrl: './privacy.component.html',
	styleUrls: []
})
export class PrivacyModalComponent implements OnInit {
	@ViewChild('privacy') privacyModal: ModalComponent;
	@Input('show')
	set show(value) {
		if (value) {
			this.privacyModal.showModal(null);
		} else {
			this.privacyModal.hideModal(null);
		}
	}
	@Output('hide')
	hideEmitter: EventEmitter<boolean> = new EventEmitter(false);
	public title: string = 'Rend-A-Ref Privacy Policy';
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

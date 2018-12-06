import {
	Component,
	OnDestroy,
	OnInit,
	Input,
	Output,
	ChangeDetectorRef,
	ViewChild
} from '@angular/core';
import { AlertModalService } from './alert-modal.service';
import { AlertState, AlertButtonState } from './alert-state';

import { ModalComponent } from './../modal/modal.component';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'rar-alert-modal',
	templateUrl: './alert-modal.component.html',
	styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit, OnDestroy {
	@ViewChild('alertModal') alertModal: ModalComponent;
	@Input() message: string;
	public modalName: string = 'alert-modal';
	public title: string = 'Alert';
	public submitText: string = 'Ok';
	public disableSubmit: boolean = true;
	public cancelText: string = 'Cancel';
	protected subscription: Subscription[] = [];

	constructor(private alertModalService: AlertModalService) {}

	ngOnInit() {
		this.subscription.push(
			this.alertModalService.modalState$.subscribe((value: boolean) => {
				if (value) {
					this.alertModal.showModal(null);
				} else {
					this.alertModal.closeModal(null);
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
	}

	protected hide(alertButtonState: AlertButtonState): void {
		this.alertModalService.message(<AlertState>{
			alertButtonState: alertButtonState
		});
	}

	public closeModal($event): void {
		this.hide(AlertButtonState.Cancel);
	}

	public submitModal($event): void {
		this.hide(AlertButtonState.Ok);
		this.alertModalService.hide();
	}
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { Toast } from './toast';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
	@Input() message = { body: '', type: '' };

	private toastSubscription: Subscription;

	constructor(private toastService: ToastService) {}

	ngOnInit() {
		this.toastService.toasts.subscribe((toast: Toast) => {
			this.setMessage(toast.body, toast.type);
		});
	}

	ngOnDestroy() {
		if (this.toastSubscription) {
			this.toastSubscription.unsubscribe();
		}
	}

	public setMessage(body, type, time = 10000) {
		this.message.body = body;
		this.message.type = type;
		setTimeout(() => {
			this.message.body = '';
		}, time);
	}
}

//https://github.com/stripe/stripe-payments-demo
import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	AfterViewInit,
	OnInit,
	OnDestroy,
	ViewChild,
	ElementRef,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentState, Payment } from './stripe-state';
import { Order } from './../models/index';
import { OrganizeService, StripeService } from '../../services/index';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

enum ViewState {
	listCards,
	addCard,
	payWithCard
}
@Component({
	selector: 'rar-stripe',
	templateUrl: './stripe.component.html',
	styleUrls: ['./stripe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeComponent implements OnInit {
	@Input() amount: number = 0;
	@Input() reference_id: string;
	@Input() user_id: string;

	@Input() lineItems: any[] = [];
	@Output() paymentState: EventEmitter<Payment> = new EventEmitter<Payment>();

	public card: any;
	public error: string;
	public model: any = {};
	public success: any = null;
	public disableSubmit: boolean = false;
	public hasSource: boolean = false;
	public sources: any[] = [];
	public viewState: ViewState = ViewState.listCards;

	constructor(
		private cd: ChangeDetectorRef,
		private organizeService: OrganizeService,
		private stripeService: StripeService
	) {}

	public ngOnInit(): void {
		this.retrieveCustomer();
	}

	public isViewState(value: string): boolean {
		let result: boolean = false;
		switch (value) {
			case 'listCards':
				result = this.viewState === ViewState.listCards;
				break;
			case 'payWithCard':
				result = this.viewState === ViewState.payWithCard;
				break;
			case 'addCard':
				result = this.viewState === ViewState.addCard;
				break;
			default:
				result = false;
				break;
		}
		return result;
	}

	public onChange({ error }) {
		if (error) {
			this.error = error.message;
			this.disableSubmit = true;
		} else {
			this.error = null;
			this.disableSubmit = false;
		}
		this.cd.detectChanges();
	}

	public showAddCard(event): void {
		this.viewState = ViewState.addCard;
	}

	private retrieveCustomer() {
		this.disableSubmit = true;
		this.hasSource = false;
		this.sources = null;
		this.viewState = ViewState.addCard;
		this.stripeService
			.retrieveCustomer(this.user_id)
			.pipe(
				finalize(() => {
					this.cd.markForCheck();
				})
			)
			.subscribe(
				customer => {
					this.disableSubmit = false;
					let sources = _.get(customer, 'sources.data', null);
					if (_.isArray(sources) && sources.length > 0) {
						this.sources = sources;
						this.hasSource = true;
						this.viewState = ViewState.listCards;
					}
				},
				(err: HttpErrorResponse) => {
					this.errorOut(err);
				}
			);
	}

	private createAndPayOrder(source) {
		let order: Order = <Order>{
			currency: 'usd',
			items: this.lineItems,
			email: this.model.email,
			shipping: {
				name: this.model.fullname,
				address: {
					line1: this.model.line1,
					city: this.model.city,
					state: this.model.state,
					postal_code: this.model.zip,
					country: 'US'
				}
			},
			metadata: {
				status: 'created',
				reference_id: this.reference_id,
				reference_id_type: 'event_id'
			}
		};
		this.error = null;
		this.success = null;
		this.disableSubmit = true;

		return this.stripeService
			.createAndPayOrder({ order: order, source: source.id })
			.pipe(
				finalize(() => {
					this.disableSubmit = false;
					this.cd.markForCheck();
				})
			)
			.subscribe(
				success => {
					this.paymentState.emit(<Payment>{
						paymentState: PaymentState.PaymentSuccess
					});
				},
				(err: HttpErrorResponse) => {
					this.errorOut(err);
					this.paymentState.emit(<Payment>{
						paymentState: PaymentState.PaymentError
					});
				}
			);
	}

	private errorOut(err: any): void {
		if (err && err.message && err.message.message) {
			this.error = err.message.message;
		} else if (err.message) {
			this.error = err.message;
		}
	}
}

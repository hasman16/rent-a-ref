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

@Component({
  selector: 'rar-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() amount: number = 0;
  @Input() reference_id: string;

  @Input() lineItems: any[] = [];
  @Output() paymentState: EventEmitter<Payment> = new EventEmitter<Payment>();

  public card: any;
  public cardHandler = this.onChange.bind(this);
  public error: string;
  public model: any = {};
  public success: any = null;
  public disableSubmit: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private organizeService: OrganizeService,
    private stripeService: StripeService
  ) {}

  public ngAfterViewInit() {
    this.card = elements.create('card', {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnInit() {}

  public ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
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

  public onSubmit(form: NgForm): void {
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

    stripe
      .createSource(this.card, {
        name: this.model.name
      })
      .then(result => {
        if (_.has(result, 'source')) {
          this.createAndPayOrder(order, result.source);
        } else {
          console.log('failed payment');
        }
      })
      .catch(err => {
        this.disableSubmit = false;
        this.errorOut(err);
      });
  }

  private createAndPayOrder(order, source) {
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

  private makeStripePayment(token) {
    this.error = null;
    this.success = null;
    this.disableSubmit = true;
    return this.stripeService
      .makeStripePayment(this.reference_id, token)
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

  private errorOut(err: any) {
    if (err && err.message && err.message.message) {
      this.error = err.message.message;
    } else if (err.message) {
      this.error = err.message;
    }
  }
}

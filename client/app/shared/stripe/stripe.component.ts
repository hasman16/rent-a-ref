//https://github.com/stripe/stripe-payments-demo
import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from './../models/index';
import { OrganizeService, StripeService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

import * as _ from 'lodash';

@Component({
  selector: 'rar-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() amount: number = 0;
  @Input() reference_id: string;
  @Output() finished: EventEmitter<boolean>;

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
    console.log('error:', this.error);
    this.cd.detectChanges();
  }

  public onSubmit(form: NgForm): void {
    let order: Order = <Order>{
      currency: 'usd',
      items: [],
      email: this.model.email,
      shipping: {
        name: this.model.name,
        address: {
          line1: this.model.line1,
          city: this.model.city,
          state: this.model.state,
          postal_code: this.model.zip,
          country: 'US'
        }
      },
      metadata: {
        status: 'created'
      }
    };
    this.error = null;
    this.success = null;
    console.log('onSubmit', form, this.model, this.card);
    this.stripeService.createStripeOrder(order);

    /*
    stripe
      .createToken(this.card, {
        country: 'US',
        currency: 'usd'
      })
      .then(result => {
        if (!_.has(result, 'error')) {
          console.log('result:', result);
          this.makeStripePayment(result.token);
        } else {
          console.log('failed payment');
        }
      })
      .catch((err: HttpErrorResponse) => {
        this.disableSubmit = false;
        console.log('error processing card 1:', err);
        this.errorOut(err);
      })
      .finally(() => {
        this.cd.markForCheck();
      });*/
  }

  private makeStripePayment(token) {
    this.error = null;
    this.success = null;
    this.disableSubmit = true;
    return this.stripeService
      .makeStripePayment(this.reference_id, token)
      .finally(() => {
        this.disableSubmit = false;
        this.cd.markForCheck();
      })
      .subscribe(
        success => {
          console.log('success:', success);
        },
        (err: HttpErrorResponse) => {
          console.log('error processing card2:', err);
          this.errorOut(err);
        }
      );
  }

  private errorOut(err: HttpErrorResponse) {
    if (_.has(err, 'error.message.message')) {
      this.error = err.error.message.message;
    }
  }
}

/*import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizeService } from '../../services/index';
import * as _ from 'lodash';
@Component({
  selector: 'rar-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  public elements: Elements;
  public card: StripeElement;

  // optional parameters
  public elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(
    private cd: ChangeDetectorRef,
    private organizeService: OrganizeService,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
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
        this.card.mount('#card-info');
      }
    });
  }

  buy() {
    this.stripeService
      .createToken(this.card, {
        country: 'US',
        currency: 'usd'
      })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  async onSubmit(form: NgForm) {
    this.stripeService
      .createToken(this.card, {
        currency: 'usd'
      })
      .subscribe(result => {
        if (!_.has(result, 'error')) {
          console.log('result:', result);
          this.makeStripePayment(result.token);
        } else {
          console.log('failed payment');
        }
      });

  }

  private makeStripePayment(token) {
    return this.organizeService.makeStripePayment(1, token).subscribe(
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
*/
//# sourceMappingURL=ngxstripe.component.js.map
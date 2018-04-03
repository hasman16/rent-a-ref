import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  OrganizeService,
} from '../../services/index';
import * as _ from 'lodash';

@Component({
  selector: 'rar-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  public card: any;
  public cardHandler = this.onChange.bind(this);
  public error: string;

  constructor(private cd: ChangeDetectorRef, private organizeService: OrganizeService) {}

  public ngAfterViewInit() {
    this.card = elements.create('card');
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
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    stripe
      .createToken(this.card, {
        country: 'US',
        currency: 'usd'
      })
      .then(result => {
        console.log('result:', result);
        if (!_.has(result, 'error')) {
          return this.organizeService.makeStripePayment(1, result)
          .subscribe(success => {
            console.log('success:', success);
          },
          err => {
            console.log('error processing card2:', err);
          });
        } else {
          console.log('failed payment');
        }
      })
      .catch(err => {
        console.log('error processing card 1:', err);
      });
  }
}

import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, HostListener, Host } from '@angular/core';
import { NgModel } from '@angular/forms';
// import { NgModel } from '@angular/common/common';

  declare var grecaptcha: any;

@Directive({
    selector: '[appGooglerecaptcha]',
  providers: [NgModel]
})
export class GoogleRecaptchaDirective implements OnInit {
  @Input('theme') theme = '';
  @Input('siteKey') siteKey: string;
  @Output('setVerified') setVerified: EventEmitter<any> = new EventEmitter();
  modelValue: any;
  private _el: HTMLElement;



  constructor(el: ElementRef, private model: NgModel) {
    this._el = el.nativeElement;
    this.modelValue = this.model;
    const input = this._el;

  }

  ngOnInit() {
    setTimeout(() => {
      grecaptcha.render(this._el, {
        'sitekey': this.siteKey,
        'callback': (data) => {
          if (data) {
            this.setVerified.emit(true);
          }
        },
        'theme': this.theme
      });
    }, 1000)

  };

  @HostListener('input') onInputChange() {
    // his.c_colorrr = 'blue';
  }
  // onInputChange() {  }
}

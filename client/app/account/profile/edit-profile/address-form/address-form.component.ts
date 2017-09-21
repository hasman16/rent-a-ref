import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() address: AddressType;
  @Input() states: any;
  @Output() saveAddress = new EventEmitter();

  addressForm: FormGroup;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '^\\d{5}(?:[ -]{1}\\d{4})?$';
  showDivAddress = true;

  constructor(private formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group({
      line1: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      line2: ['', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      city: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],

      state: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(20), Validators.pattern(this.alphaNumericRegex)]],

      zip: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(12), Validators.pattern(this.zipRegex)]]
    });
  }

  ngOnInit() {
    this.addressForm.setValue({
      line1: this.address.line1,
      line2: this.address.line2,
      city: this.address.city,
      state: this.address.state,
      zip: this.address.zip
    });
  }
}

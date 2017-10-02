import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() set address(anAddress: AddressType) {
    this.anAddress = anAddress;
    this.fillForm();
  };
  @Input() set zoneMode(mode: boolean) {
    this.mode = mode;
  }
  @Input() states: any;
  @Output() saveAddress = new EventEmitter();
  @Output() cancelForm = new EventEmitter();

  addressForm: FormGroup;
  anAddress: AddressType;
  mode: boolean = false;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '\\d{5}|\\d{5}((\\s|-)\\d{4})';
  line1Invalid = false;
  cityInvalid = false;
  zipInvalid = false;

  constructor(private formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group({
      line1: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      line2: ['', [Validators.maxLength(100), Validators.pattern(this.alphaNumericRegex)]],

      city: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],

      state: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]],

      zip: ['', [Validators.required, Validators.minLength(5),
      Validators.maxLength(10), Validators.pattern(this.zipRegex)]]
    });
    let line1 = this.addressForm.get('line1');
    let city = this.addressForm.get('city');
    let zip = this.addressForm.get('zip');

    this.validator(line1, 'line1Invalid');
    this.validator(city, 'cityInvalid');
    this.validator(zip, 'zipInvalid');
  }

  validator(item: AbstractControl, name: string) {
    item
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        let result = false;
        if (item.touched && item.invalid) {
          result = true;
        }
        this[name] = result;
      });
  }

  fillForm() {
    this.addressForm.setValue({
      line1: this.anAddress.line1,
      line2: this.anAddress.line2,
      city: this.anAddress.city,
      state: this.anAddress.state,
      zip: this.anAddress.zip
    });
  }

  ngOnInit() {
    this.fillForm();
  }

  onAddressSubmit() {
    this.saveAddress.emit(this.addressForm.value);
  }
  
  onCancel() {
    this.cancelForm.emit(false);
  }
}

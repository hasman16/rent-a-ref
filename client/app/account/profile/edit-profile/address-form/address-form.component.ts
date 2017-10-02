import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';
import { StatesService } from '../../../../services/states.service';
import { AbstractFormComponent } from '../abstract-form';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import _ from "lodash";

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends AbstractFormComponent implements OnInit {
  @Input() set address(anAddress: AddressType) {
    this.anAddress = _.cloneDeep(anAddress);
    this.fillForm();
  };
  @Input() set zoneMode(mode: boolean) {
    this.mode = mode;
  }
  @Input() set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
    this.fillForm();
  };
  @Output() saveAddress = new EventEmitter();

  addressForm: FormGroup;
  anAddress: AddressType;
  countryName: string = 'usa';
  mode: boolean = false;
  states: any;

  line1Invalid = false;
  cityInvalid = false;
  zipInvalid = false;

  constructor(private formBuilder: FormBuilder, private statesService: StatesService) {
    super();
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

    this.setUpValidators(this.addressForm, ['line1','city','zip']);
  }

  fillForm() {
    this.states = this.statesService.getStatesProvinces(this.countryName);
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

}

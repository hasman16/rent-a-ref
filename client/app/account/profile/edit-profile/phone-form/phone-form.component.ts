import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneType } from '../../../../shared/models/phoneType';

import { AbstractFormComponent } from '../abstract-form';

@Component({
  selector: 'phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent extends AbstractFormComponent implements OnInit {
  phoneForm: FormGroup;
  telephone: PhoneType;

  @Output() savePhone = new EventEmitter();
  @Input() set phone(aPhone: PhoneType) {
    this.telephone = aPhone;
    this.fillForm();
  }

  numberInvalid = false;
  descriptionInvalid = false;
  
  constructor(private formBuilder: FormBuilder) {
    super();
    this.phoneForm = this.formBuilder.group({
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });

    this.setUpValidators(this.phoneForm, ['number', 'description']);
  }

  fillForm() {
    this.phoneForm.setValue({
      number: this.telephone.number,
      description: this.telephone.description
    });
  }

  onPhoneSubmit() {
    this.savePhone.emit(this.phoneForm.value);
  }

  ngOnInit() {
    this.fillForm();
  }
}

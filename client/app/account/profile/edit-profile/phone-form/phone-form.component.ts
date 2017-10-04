import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneType } from '../../../../shared/models/phoneType';

@Component({
  selector: 'phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {
  phoneForm: FormGroup;
  telephone: PhoneType;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  showDivPhone = true;
  @Output() savePhone = new EventEmitter();
  @Output() cancelForm = new EventEmitter();
  @Input() set phone(aPhone: PhoneType) {
    this.telephone = aPhone;
    this.fillForm();
  }

  constructor(private formBuilder: FormBuilder) {
    this.phoneForm = this.formBuilder.group({
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });
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

  onCancel(event) {
    this.cancelForm.emit(false);
  }

  ngOnInit() {
    this.fillForm();
  }
}

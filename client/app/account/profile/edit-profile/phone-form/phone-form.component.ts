import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneType } from '../../../../shared/models/phoneType';

@Component({
  selector: 'phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {
  @Input() phone:PhoneType;
  @Output() savePhone = new EventEmitter();

  phoneForm: FormGroup;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  showDivPhone = true;

  constructor(private formBuilder: FormBuilder) {
    this.phoneForm = this.formBuilder.group({
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });
  }

  ngOnInit() {
    this.phoneForm.setValue({
      number: this.phone.number,
      description: this.phone.description
    });
  }
}

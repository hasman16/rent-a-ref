import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { compareFields } from '../../../../shared/compareFields';

@Component({
  selector: 'password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  @Input() password: any;
  @Output() savePassword = new EventEmitter();
  @Output() cancelForm = new EventEmitter();

  passwordForm: FormGroup;
  showDivreset = true;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      password1: ['', [<any>Validators.required,
      <any>Validators.minLength(6)]],
      password2: ['', [<any>Validators.required,
      <any>Validators.minLength(6)]]
    }, { validator: compareFields('password1', 'password2') });
  }

  onPasswordSubmit() {
    this.savePassword.emit(this.passwordForm.value);
  }
  
  onCancel() {
    this.cancelForm.emit(false);
  }

  ngOnInit() {
    this.passwordForm.setValue({
      password1: '',
      password2: ''
    });
  }
}

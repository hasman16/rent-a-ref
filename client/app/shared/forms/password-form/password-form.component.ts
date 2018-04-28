import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractFormComponent } from '../abstract-form';
import { compareFields } from '../../compareFields';
import { UserService } from '../../../services/index';

@Component({
  selector: 'password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent extends AbstractFormComponent
  implements OnInit {
  passwordForm: FormGroup;
  showDivreset = true;

  password1Invalid = false;
  password2Invalid = false;

  @Output() savePassword = new EventEmitter();
  @Input() user: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super();
    this.passwordForm = this.formBuilder.group(
      {
        password1: [
          '',
          [<any>Validators.required, <any>Validators.minLength(6)]
        ],
        password2: [
          '',
          [<any>Validators.required, <any>Validators.minLength(6)]
        ]
      },
      { validator: compareFields('password1', 'password2') }
    );

    this.setUpValidators(this.passwordForm, ['password1', 'password2']);
  }

  onPasswordSubmit() {
    this.userService
      .changepassword(this.passwordForm.value, this.user.id)
      .subscribe(
        () => {
          this.savePassword.emit({ action: 'save_success' });
        },
        (err: HttpErrorResponse) => {
          this.savePassword.emit({ action: 'save_failure' });
        }
      );
  }

  fillForm() {
    this.passwordForm.setValue({
      password1: '',
      password2: ''
    });
  }

  ngOnInit() {
    this.fillForm();
  }
}

//https://www.npmjs.com/package/ng-recaptcha
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../services/index';
import { ToastComponent } from '../shared/toast/toast.component';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  protected form: FormGroup = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = <FormlyFormOptions>{};
  protected fields: FormlyFieldConfig[];
  protected captchaResponse: string;

  constructor(
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fields = [
      {
        key: 'firstname',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Firstname',
          placeholder: 'Firstname',
          required: true
        }
      },
      {
        key: 'lastname',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Lastname',
          placeholder: 'Lastname',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'repeatemail',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Repeat email address',
          placeholder: 'Re-enter email',
          required: true
        },
        validators: {
          fieldMatch: {
            expression: control => control.value === this.model.email,
            message: 'Email address Not Matching'
          }
        },
        expressionProperties: {
          'templateOptions.disabled': () => !this.form.get('email').valid
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter password',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'repeatpassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Repeat password',
          placeholder: 'Repeat password',
          required: true
        },
        validators: {
          fieldMatch: {
            expression: control => control.value === this.model.password,
            message: 'Password Not Matching'
          }
        },
        expressionProperties: {
          'templateOptions.disabled': () => !this.form.get('password').valid
        }
      },
      {
        key: 'phone',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Phone number',
          placeholder: 'Phone number',
          required: true
        }
      }
    ];
  }

  public resolvedRecaptcha(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaResponse = captchaResponse;
  }

  register(user) {
    if (_.isNil(this.captchaResponse) || this.captchaResponse.length === 0) {
      this.toast.setMessage('Recaptcha is required.', 'danger');
      return;
    }

    if (user.email !== user.repeatemail) {
      this.toast.setMessage('Emails do not match', 'danger');
      return;
    } else if (user.password !== user.repeatpassword) {
      this.toast.setMessage('Passwords do not match', 'danger');
      return;
    }
    user.captcha = this.captchaResponse;

    this.userService.register(user).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.toast.setMessage('This email address already exists', 'danger');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
        }
      }
    );
  }
}

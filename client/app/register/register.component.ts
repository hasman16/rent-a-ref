import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

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

  constructor(
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fields = [
      {
        key: 'firstname',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Firstname',
          placeholder: 'Firstname',
          required: true
        }
      },
      {
        key: 'lastname',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Lastname',
          placeholder: 'Lastname',
          required: true
        }
      },
      {
        key: 'email',
        type: 'horizontalInput',
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
        type: 'horizontalInput',
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
        type: 'horizontalInput',
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
        type: 'horizontalInput',
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
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Phone number',
          placeholder: 'Phone number',
          required: true
        }
      }
    ];
  }

  register(user) {
    let valid: boolean = false;

    if (user.email !== user.repeatemail) {
      valid = false;
      this.toast.setMessage('Emails do not match', 'danger');
    }

    if (user.password !== user.passwordrepeat) {
      valid = false;
      this.toast.setMessage('Passwords do not match', 'danger');
    }

    if (valid) {
      this.userService.register(user).subscribe(
        res => {
          this.toast.setMessage(res.message, 'success');
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.toast.setMessage(
              'This email address already exists',
              'danger'
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
          }
        }
      );
    }
  }
}

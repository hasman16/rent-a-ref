import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { ToastComponent } from '../shared/toast/toast.component';

import { AuthService, UserService } from '../services/index';
import { Login, User } from './../shared/models/index';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected cookieValue: string = 'UNKNOWN';
  protected cookieCheck: boolean = false;
  protected checkboxFlag: boolean = false;
  public form: FormGroup = new FormGroup({});
  public model: any = {};
  public options: FormlyFormOptions = <FormlyFormOptions>{};
  public fields: FormlyFieldConfig[];
  public showDirections: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    public toast: ToastComponent
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }

    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'email',
          placeholder: 'Email Address',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'password',
          placeholder: 'Password',
          required: true,
          minLength: 5
        }
      }
    ];
  }

  public forgot() {
    this.router.navigate(['passwordreset']);
  }

  public onSubmit(data: any): void {
    this.auth
      .login(data)
      .take(1)
      .subscribe(
        (login: Login) => {},
        (err: HttpErrorResponse) => {
          this.toast.setMessage('Invalid email or password! ', 'danger');
        }
      );
  }
}

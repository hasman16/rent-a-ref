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

  forgot() {
    this.router.navigate(['passwordreset']);
  }

  redirectUser(userStatus: string, userId: string) {
    let path: string = '';
    switch (userStatus) {
      case 'active':
        path = `account/${userId}/profile`;
        break;
      case 'pending':
        path = `account/${userId}/standby`;
        break;
      case 'locked':
        path = `account/${userId}/suspended`;
        break;
      case 'banned':
        path = `account/${userId}/deactivated`;
        this.auth.resetState();
        break;
      default:
        path = '/';
        this.auth.resetState();
        break;
    }
    return path;
  }

  onSubmit(data: any) {
    this.auth
      .login(data)
      .take(1)
      .subscribe(
        (login: Login) => {
          const user: User = login.user;
          const userId = user.id;
          const userStatus = user.status;
          const path: string = this.redirectUser(userStatus, userId);

          this.router.navigate([path]);
        },
        (err: HttpErrorResponse) => {
          this.toast.setMessage('Invalid email or password! ', 'danger');
        }
      );
  }
}

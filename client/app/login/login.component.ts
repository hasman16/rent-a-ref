import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CookieService } from 'ngx-cookie-service';

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
  protected form: FormGroup = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = <FormlyFormOptions>{};
  protected fields: FormlyFieldConfig[];

  constructor(
    private auth: AuthService,
    private router: Router,
    public toast: ToastComponent,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }

    this.checkboxFlag =
      this.cookieService.get('checkboxFlag') === 'true' ? true : false;

    if (this.checkboxFlag) {
      this.cookieValue = this.cookieService.get('email');
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

          if (this.checkboxFlag) {
            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 365 * 5);
            this.cookieService.set('email', user.email);
            this.cookieService.set('checkboxFlag', 'true');
          } else {
            // Delete cookie entry
            this.cookieService.set('checkboxFlag', 'false');
            this.cookieCheck = this.cookieService.check('email');
            this.cookieService.delete('email');
          }

          this.router.navigate([path]);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.toast.setMessage('invalid email or password! ', 'danger');
          } else {
            this.toast.setMessage('invalid email or password! ', 'danger');
          }
        }
      );
  }
}

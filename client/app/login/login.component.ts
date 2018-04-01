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

  routeOrganizer(canOrganize:string, userStatus:string, userId:string):string {
    let path: string = '';
    // Check if the user is a referee/organizer and if his/she has not yet completed the profile form, then redirect him/her to the form
    // Organizer
    switch (canOrganize + ' ' + userStatus) {
      case 'pending standby':
        path = 'account/profile/' + userId;
        break;
      case 'yes active':
        path = 'account/' + userId;
        break;
      case 'yes locked':
        path = 'account/suspended/' + userId;
        break;
      case 'no banned':
        path = 'account/deactivated/' + userId;
        break;
    }
    return path;
  }

  routeUser(canReferee: string, userStatus: string, userId: string): string {
    let path: string = '';

    // Referee
    switch (canReferee + ' ' + userStatus) {
      case 'pending active':
        path = 'account/profile/' + userId;
        break;
      case 'pending in_progress':
        path = 'account/standby/' + userId;
        break;
      case 'yes active':
        path = 'account/' + userId;
        break;
      case 'yes locked':
        path = 'account/suspended/' + userId;
        break;
      case 'no banned':
        path = 'account/deactivated/' + userId;
        break;
      default:
        path = 'account/' + userId;
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
          const path1: string = this.routeOrganizer(user.can_organize, userStatus, userId);
          const path2: string = this.routeUser(user.can_referee, userStatus, userId);

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

          if (path1.length > 0) {
            this.router.navigate([path1]);
          } else if (path2.length > 0) {
            this.router.navigate([path2]);
          }
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

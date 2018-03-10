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
  protected cookieValue = 'UNKNOWN';
  protected cookieCheck = false;
  protected checkboxFlag = false;
  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];

  constructor(private auth: AuthService,
    private router: Router,
    public toast: ToastComponent,
    private cookieService: CookieService) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }

    this.checkboxFlag = this.cookieService.get('checkboxFlag') === 'true' ? true : false;

    if (this.checkboxFlag) {
      this.cookieValue = this.cookieService.get('email');
    }

    this.fields = [{
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
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

  onSubmit(data: any) {
    this.auth.login(data)
      .take(1)
      .subscribe(
      (login: Login) => {
        const user: User = login.user;

        if (this.checkboxFlag) {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + (365 * 5));
          this.cookieService.set('email', user.email);
          this.cookieService.set('checkboxFlag', 'true');
        } else {
          // Delete cookie entry
          this.cookieService.set('checkboxFlag', 'false');
          this.cookieCheck = this.cookieService.check('email');
          this.cookieService.delete('email');
        }

        // Check if the user is a referee/organizer and if his/she has not yet completed the profile form, then redirect him/her to the form
        // Organizer
        switch (user.can_organize + ' ' + user.status) {
          case ('pending standby'):
            this.router.navigate(['account/profile/' + user.id]);
            break;
          case ('yes active'):
            this.router.navigate(['account/' + user.id]);
            break;
          case ('yes locked'):
            this.router.navigate(['account/suspended/' + user.id]);
            break;
          case ('no banned'):
            this.router.navigate(['account/deactivated/' + user.id]);
            break;
        }

        // Referee
        switch (user.can_referee + ' ' + user.status) {
          case ('pending active'):
            this.router.navigate(['account/profile/' + user.id]);
            break;
          case ('pending in_progress'):
            this.router.navigate(['account/standby/' + user.id]);
            break;
          case ('yes active'):
            this.router.navigate(['account/' + user.id]);
            break;
          case ('yes locked'):
            this.router.navigate(['account/suspended/' + user.id]);
            break;
          case ('no banned'):
            this.router.navigate(['account/deactivated/' + user.id]);
            break;
          default:
            this.router.navigate(['account/' + user.id]);
            break;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import 'jquery-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  cookieCheck = false;
  checkboxFlag = false;
  stringEmail = '';
  submitted = false;
  loginForm: FormGroup;
  email = new FormControl('', [<any>Validators.required, <any>Validators.email]);
  password = new FormControl('', [<any>Validators.required,
    <any>Validators.minLength(6)]);

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private cookieService: CookieService) {

               }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.checkboxFlag = this.cookieService.get('checkboxFlag') === 'true' ? true: false;

    if (this.checkboxFlag) {
      this.cookieValue = this.cookieService.get('email');
    }

    if (this.cookieValue !== 'UNKNOWN') {
      // this.email = JSON.stringify(this.cookieValue);
    }
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  onForgot() {
    this.router.navigate(['passwordreset']);
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => {

        this.submitted = true;

        const user = res.user;

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

        console.log('organizer:', user.can_organize + ' ' + user.status);
        // Organizer
        switch (res.user.can_organize + ' ' + res.user.status) {
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
        console.log('Referee :', user.can_referee + ' ' + user.status);
        switch (user.can_referee + ' ' + user.status) {
          case ('pending active'):
            this.router.navigate(['account/profile/' + user.id]);
            break;
          case ('pending in_progress'):
            this.router.navigate(['account/standby/' + user.id]);
            break;
          case ('yes active'):
            this.router.navigate(['account/' + user.id ]);
            break;
          case ('yes locked'):
            this.router.navigate(['account/suspended/' + user.id ]);
            break;
          case ('no banned'):
            this.router.navigate(['account/deactivated/' + user.id]);
            break;
          default:
            this.router.navigate(['account/' + res.user.id ]);
            break;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('A client-side or network error occurred');
          this.toast.setMessage('invalid email or password! ', 'danger');
        } else {
          console.log('The backend returned an unsuccessful response code');
          this.toast.setMessage('invalid email or password! ', 'danger');
        }
      }
    );

  }
}

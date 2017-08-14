import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CookieService } from 'ngx-cookie-service';
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
  stringBoxCheck = 'false'
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
    this.stringBoxCheck = this.cookieService.get('checkboxFlag');
    if (this.stringBoxCheck === 'false') {
      this.checkboxFlag = false;
    } else {
      this.checkboxFlag = true;
    }
    if (this.checkboxFlag) {
      this.cookieValue = this.cookieService.get('email');
    }
    if (this.cookieValue !== 'UNKNOWN') {
      // this.email = JSON.stringify(this.cookieValue);
    }
    // this.email = JSON.stringify(this.email);
    // this.email = JSON.stringify(this.cookieService.get('Rent-A-Ref-Username'));
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
        // console.log('status: ' + res['success'] + ' Message: ' + res['message']);
        console.log('Response: ', res);
        console.log('Response user: ', res.user);
        console.log('Response can ref: ', res.user.can_referee);
        console.log('Response can org: ', res.user.can_organize);
        console.log('checkboxFlag: ', this.checkboxFlag);
        if (this.checkboxFlag) {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + (365 * 5));
          this.cookieService.set('email', res.user.email);
          // this.cookieService.set('email', res.user.email, expireDate, '/login', 'rent-a-ref.com', true);
          this.cookieService.set('checkboxFlag', 'true');
          // this.cookieService.set('Rent-A-Ref-Password', res.user.password);
        } else {
          // Delete cookie entry
          this.cookieService.set('checkboxFlag', 'false');
// Check if cookie entry exists
          this.cookieCheck = this.cookieService.check('email');
          // if (this.cookieCheck) {
            this.cookieService.delete('email');
          // }
        }
        // this.router.navigate(['/']);
        // Check if the user is a referee/organizer and if his/she has not yet completed the profile form, then redirect him/her to the form


        // Organizer
        switch (res.user.can_organize + ' ' + res.user.status) {
          case ('pending standby'):
            // The organizer has not yet completed the profile
            this.router.navigate(['user/' + res.user.id + '/edit-profile']);
            break;
          case ('yes active'):
            // The organizer is active and ready to go
            this.router.navigate(['user/' + res.user.id + '/account']);
            break;
          case ('yes locked'):
            // The Organizer account is suspended due to failed login attempts
            // Kill his session
            // his.loggedIn = false;
            this.router.navigate(['user/' + res.user.id + '/suspended']);
            break;
          case ('no banned'):
            // The Organizer account is disabled by the admin
            this.router.navigate(['user/' + res.user.id + '/deactivated']);
            break;
          default:
            this.router.navigate(['user/' + res.user.id + '/account']);
            break;
        }

        // Referee
        switch (res.user.can_referee + ' ' + res.user.status) {
          case ('pending active'):
            // The referee account has been activated by the admin. Now he needs to complete his profile
            this.router.navigate(['user/' + res.user.id + '/edit-profile']);
            break;
          case ('pending in_progress'):
            // The referee account has not yet been activated by the admin. Still in Standby
            this.router.navigate(['user/' + res.user.id + '/standby']);
            break;
          case ('yes active'):
            // The referee is active and ready to go
            this.router.navigate(['user/' + res.user.id + '/account']);
            break;
          case ('yes locked'):
            // The referee account is suspended due to failed login attempts
            this.router.navigate(['user/' + res.user.id + '/suspended']);
            break;
          case ('no banned'):
            // The referee account is disabled by the admin
            this.router.navigate(['user/' + res.user.id + '/deactivated']);
            break;
          default:
            this.router.navigate(['user/' + res.user.id + '/account']);
            break;
        }
      },
      error => this.toast.setMessage('invalid email or password! ', 'danger')
    );

  }
  // Cookies
  /*
  putCookie() {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + (365 * 5));

    $cookies.put('acdelco-test-launcher', JSON.stringify($scope.launch), {
      expires: expireDate,
      path: '/'
    });
  };

function getCookie() {
  var c = $cookies.get('acdelco-test-launcher')
  if (c != null) {
    var x = JSON.parse(c);
    if (x != null) {
      $scope.launch = x;
    } else {
      // set defaults
      $scope.launch = {
        "url": "http://dev.dstgateway.com/ACDelco/#/",
        "sessionKey": "",
        "parms": ""
      };
    }
  }*/
}




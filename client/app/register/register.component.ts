import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import 'jquery-ui';
import { GoogleRecaptchaDirective } from '../shared/googlerecaptcha.directive';
import { CreateRecaptchaComponent } from 'ng2-google-recaptcha/create-recaptcha/create-recaptcha.component';
@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  firstname = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(30),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(50),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  lastname = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(50),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  // middlename = new FormControl('', [Validators.maxLength(50),  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  email = new FormControl('', [Validators.required, Validators.email]);

  repeatemail = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  passwordrepeat = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  phone = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);

  role = new FormControl('', [Validators.required]);

  // firstname = this.fullname;

  valid = true;
  errorMSG = '';
  /*
  public verified: any;
  public siteKey = '6Le2rSsUAAAAAH5sKN-FpYJGXAC-skdE23lbHN_a'; // place your key here
  public theme = 'light'; // you can give any google themes light or dark
  setVerified(data) {
    console.log(data)
  }*/
  /* tslint:disable:no-unused-variable */
  private recaptchaSiteKey = '6Le2rSsUAAAAAH5sKN-FpYJGXAC-skdE23lbHN_a';
  private recaptchaStyle = {
    theme: 'dark',
    type: 'audio',
  };

  private recaptcha1Id = 'recaptcha_1';
  private recaptcha2Id = 'recaptcha_2';

  //
  // Called when the Captcha has finished
  //
  private onCaptchaComplete(response: any) {

    console.log('reCAPTCHA response recieved:');
    console.log('response: ' + response);
    console.log('success: ' + response.success);
    console.log('token: ' + response.token);

    // If we succeeded, reset it in a couple of seconds as
    // part of the demo showing how to use it
    if (response.success === true) {
      setTimeout(() => {
        response.recaptcha.resetRecaptcha();
      }, 2000);
    }
  }
    /* tslint:enable:no-unused-variable */
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) {
    $(function () {
      // $('.required-icon').tooltip();
    });
               }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: this.firstname,
      // middlename: this.middlename,
      lastname: this.lastname,
      email: this.email,
      repeatemail: this.repeatemail,
      password: this.password,
      passwordrepeat: this.passwordrepeat,
      phone: this.phone,
      role: this.role
    });
  }
  /*
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: this.firstname,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }
*/
  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassfirstname() {
    return { 'has-danger': !this.firstname.pristine && !this.firstname.valid };
  }
  /*setClassmiddlename() {
    return { 'has-danger': !this.middlename.pristine && !this.middlename.valid };
  }*/
  setClasslastname() {
    return { 'has-danger': !this.lastname.pristine && !this.lastname.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassrepeatEmail() {
    return { 'has-danger': !this.repeatemail.pristine && !this.repeatemail.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  setClassPasswordrepeat() {
    return { 'has-danger': !this.passwordrepeat.pristine && !this.passwordrepeat.valid };
  }
  setClassphone() {
    return { 'has-danger': !this.phone.pristine && !this.phone.valid };
  }

  register() {
    if (this.email.value !== this.repeatemail.value) {
      this.valid = false;
      this.toast.setMessage('Emails do not match', 'danger');
    } else {
      this.valid = true;
    }

    if (this.password.value !== this.passwordrepeat.value) {
      this.valid = false;
      this.toast.setMessage('Passwords do not match', 'danger');
      // this.toast.setMessage('Passwords: ' + this.password.value + ' repeat: ' + this.passwordrepeat.value, 'danger');
    }

    if (this.valid) {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('You successfully registered!', 'success');
        console.log('Response: ' + res);
       console.log('status: ' + res.success + ' Message: ' + res.message);
        // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
        // console.log('Response from the server for user: ' + res.body.message);
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('status: ' + err.status + ' Message: ' + err.message);
          console.log('An error occurred:', err.error.message);
          this.toast.setMessage('An error occurred:' + err.message, 'danger');
          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, Error Message: ${err.statusText}, body was: ${err.error}`);
          console.log('status: ' + err.status + ' Message: ' + err);
          this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
         // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');


          // this.toast.setMessage('Error Message: ' + err.error.message, 'danger');
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }
    // console.log('Erro: ' + this.error);
  }


}

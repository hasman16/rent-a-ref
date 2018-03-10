import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  password1 = new FormControl('', [
    <any>Validators.required,
    <any>Validators.minLength(6)
  ]);
  password2 = new FormControl('', [
    <any>Validators.required,
    <any>Validators.minLength(6)
  ]);
  passcode = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent
  ) {}

  ngOnInit() {
    let hasPasscode: boolean;
    let passcodeParam: any;

    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }

    this.route.params.subscribe(params => {
      passcodeParam = params['passcode'];
    });

    hasPasscode = passcodeParam != undefined;

    if (hasPasscode) {
      this.passcode = new FormControl(String(passcodeParam));
    } else {
      this.passcode = new FormControl('');
    }

    this.resetPasswordForm = this.formBuilder.group({
      password1: this.password1,
      password2: this.password2,
      passcode: this.passcode
    });
  }

  setClassPassword1() {
    return { 'has-danger': !this.password1.pristine && !this.password1.valid };
  }

  setClassPassword2() {
    return { 'has-danger': !this.password2.pristine && !this.password2.valid };
  }

  resetPassword() {
    this.auth.resetpassword(this.resetPasswordForm.value).subscribe(
      res => {
        const user = res.user;
      },
      error => {
        this.toast.setMessage('Failed to reset password!', 'danger');
      }
    );
  }
}

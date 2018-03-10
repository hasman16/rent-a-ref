import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AuthService, UserService } from '../../../services/index';
import { ToastComponent } from '../../../shared/toast/toast.component';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public showDivreset = true;
  public passwordForm: FormGroup;

  public email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public passcode: FormControl = new FormControl('', [
    <any>Validators.required,
    <any>Validators.minLength(6)
  ]);

  public password1: FormControl = new FormControl('', [
    <any>Validators.required,
    <any>Validators.minLength(6)
  ]);

  public password2: FormControl = new FormControl('', [
    <any>Validators.required,
    <any>Validators.minLength(6)
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: this.email,
      passcode: this.passcode,
      password1: this.password1,
      password2: this.password2
    });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onReset() {
    this.router.navigate(['/reset']);
  }

  onResetSubmit() {
    this.userService.resetpassword(this.passwordForm.value).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        // this.hideShowDiv = true;
        this.showDivreset = false;
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.

          this.toast.setMessage('This email address does not exists', 'danger');
          this.showDivreset = true;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,

          this.toast.setMessage(
            'An error occurred:' + err.statusText,
            'danger'
          );
          // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
          this.showDivreset = true;
        }
      }
      // error => console.log('An Error Occurred: ' + error),
      // () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  setClassEmail1() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPasscode() {
    return { 'has-danger': !this.passcode.pristine && !this.passcode.valid };
  }

  setClassPassword1() {
    return { 'has-danger': !this.password1.pristine && !this.password1.valid };
  }

  setClassPassword2() {
    return { 'has-danger': !this.password2.pristine && !this.password2.valid };
  }
}

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
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {
  public divMessage: string = '';
  public hideShowDiv: boolean = false;
  public emailForm: FormGroup;
  public email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: this.email
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

  onSubmit() {
    this.userService.forgotpassword(this.emailForm.value).subscribe(
      res => {
        this.toast.setMessage(res.message, 'success');
        this.divMessage = res.message;
        this.hideShowDiv = true;
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.toast.setMessage('This email address does not exists', 'danger');
          this.hideShowDiv = false;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.toast.setMessage(
            'An error occurred:' + err.statusText,
            'danger'
          );
          this.hideShowDiv = false;
        }
      });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
}
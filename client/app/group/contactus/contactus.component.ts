import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastComponent } from '../.././shared/toast/toast.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;

  fullname = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(50),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  subject = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(30),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  email = new FormControl('', [Validators.required, Validators.email]);

  textMessage = new FormControl('', [Validators.required,
  Validators.minLength(10),
  Validators.maxLength(900),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  valid = true;
  errorMSG = '';

  /* tslint:enable:no-unused-variable */
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService) {

  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      fullname: this.fullname,
      // middlename: this.middlename,
      subject: this.subject,
      email: this.email,
      textMessage: this.textMessage
    });
  }

  setClassfullname() {
    return { 'has-danger': !this.fullname.pristine && !this.fullname.valid };
  }

  setClassSubject() {
    return { 'has-danger': !this.subject.pristine && !this.subject.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassTextMessage() {
    return { 'has-danger': !this.textMessage.pristine && !this.textMessage.valid };
  }

  contact() {
      this.userService.register(this.contactForm.value).subscribe(
        res => {
          this.toast.setMessage(res.message, 'success');
          console.log('Response: ' + res);
          console.log('status: ' + res.success + ' Message: ' + res.message);
          // console.log('Response from the server: ' + res.headers.get('X-Custom-Header'));
          // console.log('Response from the server for user: ' + res.body.message);
          // this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('status: ' + err.status + ' Message: ' + err.message);
            console.log('An error occurred:', err.error.message);
            this.toast.setMessage('Message could not be sent due to an error', 'danger');
            // this.toast.setMessage('An error occurred:' + err.message, 'danger');
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
    // console.log('Erro: ' + this.error);
  }


}

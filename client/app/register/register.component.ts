import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import * as $ from 'jquery';
import 'jquery-ui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  firstname = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(50),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  email = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  phone = new FormControl('', [Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20)]);

  passwordrepeat = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  role = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);
  // firstname = this.fullname;



  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) {
    $(function () {
      $('.required-icon').tooltip({
        placement: 'left',
        title: 'Required field'
      });
    });
               }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: this.firstname,
      email: this.email,
      password: this.password,
      passwordrepeat: this.passwordrepeat,
      phone: this.phone,
      sex: this.sex,
      role: this.role
    });
  }

  setClassfullname() {
    return { 'has-danger': !this.firstname.pristine && !this.firstname.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
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
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => console.log(error),
      () => this.toast.setMessage('email already exists', 'danger')
      // error => this.toast.setMessage('email already exists', 'danger')
    );
    // console.log('Erro: ' + this.error);
  }


}

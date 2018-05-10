import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CookieService } from 'ngx-cookie-service';

import { ToastComponent } from '../../shared/toast/toast.component';

import { AuthService, UserService } from '../../services/index';
import { Login, User } from './../../shared/models/index';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactUsComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public model: any = {};
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[];

  constructor(public toast: ToastComponent) {}

  ngOnInit() {
    this.fields = [
      {
        key: 'fullname',
        type: 'input',
        templateOptions: {
          placeholder: 'Fullname',
          label: 'Fullname',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          placeholder: 'Email Address',
          label: 'Email',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'subject',
        type: 'input',
        templateOptions: {
          placeholder: 'Subject',
          label: 'Subject',
          required: true,
          minLength: 5
        }
      },
      {
        key: 'comment',
        type: 'textarea',
        templateOptions: {
          type: 'textarea',
          placeholder: 'Comment',
          label: 'Comment',
          required: true,
          minLength: 5
        }
      }
    ];
  }

  onSubmit(model) {}
}

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
  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];

  constructor(public toast: ToastComponent) { }

  ngOnInit() {
    this.fields = [{
      key: 'fullname',
      type: 'horizontalInput',
      templateOptions: {
        type: 'input',
        label: 'Fullname',
        placeholder: 'John Smith',
        required: true,
        minLength: 5
      }
    },
    {
      key: 'email',
      type: 'horizontalInput',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'pele@soccer.com',
        required: true,
        minLength: 5
      }
    },
    {
      key: 'subject',
      type: 'horizontalInput',
      templateOptions: {
        type: 'input',
        label: 'Password',
        placeholder: 'password',
        required: true,
        minLength: 5
      }
    },
    {
      key: 'comment',
      type: 'horizontalInput',
      templateOptions: {
        type: 'text-area',
        label: 'Comment',
        placeholder: '',
        required: true,
        minLength: 5
      }
    }
    ];
  }

  onsubmit(model) {


  }
}

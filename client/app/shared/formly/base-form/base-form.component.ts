import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { ToastComponent } from '../../../shared/toast/toast.component';

import { AuthService, UserService } from '../../../services/index';


import 'rxjs/add/operator/take';

@Component({
  selector: 'rf-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class RFBaseFormComponent implements OnInit {
  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];

  constructor() {}

  ngOnInit() {
    this.fields = [];
  }

}

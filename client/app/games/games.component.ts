import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { ToastComponent } from '../shared/toast/toast.component';
import {
  AuthService,
  CanComponentDeactivate,
  ProfileService,
  UserService
} from './../services/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected form: FormGroup = new FormGroup({});
  protected userModel = { email: 'email@gmail.com' };
  protected userFields: Array<FormlyFieldConfig> = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true
      }
    }
  ];

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoading = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  submit(user) {
    console.log(user);
  }
}

import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from './../services/can-deactivate-guard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../services/profile.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;
  protected form = new FormGroup({});
  protected userModel = { email: 'email@gmail.com' };
  protected userFields: Array<FormlyFieldConfig> = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  }];

  constructor(public auth: AuthService,
    public toast: ToastComponent, private profileService: ProfileService, private router: Router,
    private userService: UserService) { }

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

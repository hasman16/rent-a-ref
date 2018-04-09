import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService, CanComponentDeactivate } from './../../services/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rar-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit, CanComponentDeactivate {
  protected isLoading: boolean = true;
  protected allowEdit: boolean = false;

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private router: Router
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

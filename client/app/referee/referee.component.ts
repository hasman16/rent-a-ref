import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from './../services/can-deactivate-guard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.scss']
})
export class RefereeComponent implements OnInit, CanComponentDeactivate {

  users = [];
  isLoading = true;
  allowEdit = false;
  constructor(public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      // data => this.users = data,
      // error => console.log(error),
      // () => this.isLoading = false
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }


  callSuccess(res) {
    this.toast.setMessage(res.message, 'success');
    this.users = res;
    this.isLoading = false;
    console.log('this.users: ', this.users);
    // this.onCancel();
  }

  callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toast.setMessage(message, 'danger');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
    console.log('Error: ' + err.error + ' Status: ' + err.statusText);
    // this.resetDivs();
  }
}

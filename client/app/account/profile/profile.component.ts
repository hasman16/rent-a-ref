import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ToastComponent } from '../../shared/toast/toast.component';
// import { EditProfileComponent } from './edit-profile/edit-profile.component';

// Start
/*@Component({
  selector: 'app-edit-profile',
  templateUrl: '../../edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  address = { id: '', line1: '', line2: '', city: '', state: '', zip: '' };
  isLoading = true;
  model;
  abort = false;


  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) {

  }

}
*/

// End
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  person = {};

  available = { city: '', state: '', zip: '' };
  isLoading = true;
  allowEdit = false;

  edit = 'account/profile';
  id = this.auth.currentUser.id;
  abort = false;
  divPassword = false;


  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private userService: UserService) { }

  ngOnInit() {

    this.getUser();
    if (!this.abort) {
      this.getPerson();
      this.getPersonPhone();
      // this.getUserAddress();
      this.getUserAddress_perID();
    }

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
  }

  getProfile() {
    this.userService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
        this.data = res;
        this.person = res.person;
        this.addresses = res.addresses;
        this.phones = res.phones;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile', this.auth.loggedIn);
          this.isLoading = false;
          if (this.auth.loggedIn) {
            console.log('Still loggedIn');
          } else {
            console.log('Session expired');
            this.abort = true;
            this.auth.logout();
          }
        } else {
          console.log('The backend returned an unsuccessful response code for the profile', this.auth.loggedIn);
          this.isLoading = false;
          if (this.auth.loggedIn) {
            console.log('Still loggedIn: ');
          } else {
            console.log('Session expired');
            this.abort = true;
            this.auth.logout();
          }
        }
      }
      // error => this.auth.logout(),
      // () => this.isLoading = false
    );

  }

  onEdit() {
    console.log('this.divPassword: ', this.divPassword);
    this.route.queryParams
      .subscribe(
      (queryParams: Params) => {
        this.divPassword = queryParams['divPassword'] === 'password' ? true : false;
      }
    );
    console.log('this.divPassword 1: ', this.divPassword);
    this.router.navigate(['edit-profile'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}

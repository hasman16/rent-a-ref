import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
  phone = {};
  address = { id: '', line1: '', line2: '', city: '', state: '', zip: '' };
  available = { city: '', state: '', zip: '' };
  isLoading = true;
  allowEdit = false;
  edit = 'account/profile/edit-profile/';

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.getPerson();
    this.getPersonPhone();
    // this.getUserAddress();
    this.getUserAddress_perID()
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    /*
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }*/
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.data = res;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response data: ' + JSON.stringify(res));
        console.log('status: ' + res.id + ' Message: ' + res.firstname);
      },
      error => this.auth.logout(),
      () => this.isLoading = false
    );
    console.log('data: ' + JSON.stringify(this.data));
  }

  getPerson() {
    this.userService.getPerson(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.person = res;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response Person: ' + JSON.stringify(res));
        console.log('status person: ' + res.id + ' Message: ' + res.firstname);
      },
      error => console.log('Get Person error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }


  getPersonPhone() {
    this.userService.getUserPhone(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.phone = res;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserPhone: ' + JSON.stringify(res));
        console.log('status getUserPhone: ' + res.id + ' Message: ' + res.phone);
      },
      error => console.log('Get getUserPhone error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }

  getUserAddress() {
    this.userService.getUserAddress(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.address = res.addresses;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserAddress: ' + JSON.stringify(res));
        console.log('status getUserAddress: ' + res.id + ' Message: ' + res.addresses.line1);
      },
      error => console.log('Get getUserAddress error: ', error),
      () => this.isLoading = false
    );
    // console.log('data: ' + JSON.stringify(this.data));
  }

  getUserAddress_perID() {
    this.userService.getUserAddress_id(this.auth.currentUser.id, this.address.id).subscribe(
      // data => this.user = data,
      res => {
        // this.toast.setMessage(res.message, 'success');
        console.log('Response getUserAddress_ID: ' + JSON.stringify(res));
        console.log('status getUserAddress_ID: ' + res.id + ' Message: ' + res.addresses.line1);
      },
      error => console.log('Get getUserAddress_ID error: ', error),
      () => this.isLoading = false
    );
  }

  onEdit() {
    this.router.navigate([this.edit, this.auth.currentUser.id], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}

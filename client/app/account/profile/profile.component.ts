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

  available = { city: '', state: '', zip: '' };
  isLoading = true;
  allowEdit = false;
  edit = 'account/profile/edit-profile/';
  addresses = [];
  phones = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
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
      error => this.auth.logout(),
      () => this.isLoading = false
    );

  }

  onEdit() {
    this.router.navigate([this.edit, this.auth.currentUser.id], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}

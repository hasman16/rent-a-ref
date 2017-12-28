import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  // user = {};
  user = { id: '', email: '', can_referee: '', can_organize: '', status: '' };
  person = { id: '', firstname: '', middlenames: '', lastname: '', dob: '' };

  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    console.log('ngOnInit: getUser');
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
        this.user = res;

        this.person = res.person;
        this.isLoading = false;
        /*this.addresses = res.addresses;
        this.phones = res.phones;
        this.address = this.addresses[0];
        this.phone = this.phones[0];
        this.selectedValue = res.person.gender;

        if (res.person.dob !== '') {
          const varYear = res.person.dob.substring(0, 4);
          const varMonth = res.person.dob.substring(5, 7);
          const varDay = res.person.dob.substring(8, 10);
          this.dateModel = { date: { year: varYear, month: varMonth, day: varDay } };
        }*/
      },

      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('A client-side or network error occurred for the Profile');
        } else {
          console.log('The backend returned an unsuccessful response code for the profile');

        }
        // this.isLoading = false;
        if (!this.auth.loggedIn) {
          // this.abort = true;
          this.auth.logout();
        }
      }
    );
  }

  onActivate() {
    // Activate the account as Organizer
  }

  onOrganize() {
    // events or request referee(s) as Organizer
  }

  onRefereeActivate() {
    // Become a refereee
  }
/*
  getUser() {
    // this.userService.getUser(this.auth.currentUser).subscribe(
    this.userService.getUser(this.auth.currentUser.id).subscribe(
      data => this.user = data,
      error => console.log('Get user error: ', error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }
*/
}

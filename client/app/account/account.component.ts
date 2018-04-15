import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService, UserService } from '../services/index';
import {
  Address,
  Person,
  Phone,
  Profile,
  User
} from './../shared/models/index';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  protected user: User = <User>{};
  protected person: Person = <Person>{};

  constructor(
    private auth: AuthService,
    private toast: ToastComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const currentUser: User = this.auth.getCurrentUser();

    this.userService.getProfile(currentUser.id).subscribe(
      (res: Profile) => {
        this.user = {
          id: String(res.id),
          email: res.email,
          authorization: String(res.authorization),
          firstname: res.person.firstname,
          lastname: res.person.lastname,
          role: '',
          person_id: String(res.person.id),
          can_referee: res.can_referee,
          can_organize: res.can_organize,
          status: res.status
        } as User;

        this.person = res.person;
      },

      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log(
            'A client-side or network error occurred for the Profile'
          );
        } else {
          console.log(
            'The backend returned an unsuccessful response code for the profile'
          );
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
}

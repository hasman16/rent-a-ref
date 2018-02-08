import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Address, Person, Phone, Profile, User } from './../../../shared/models/index';

@Component({
  selector: 'app-suspended',
  templateUrl: './suspended.component.html',
  styleUrls: ['./suspended.component.scss']
})
export class SuspendedComponent implements OnInit {
  protected user:User = <User>{};
  protected person:Person = <Person>{};


  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
  }
  
  onSubmit() {
    this.router.navigate(['passwordreset']);
  }

  getProfile() {
    this.userService.getProfile(this.auth.currentUser.id).subscribe(
      res => {
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
}

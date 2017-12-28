import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-suspended',
  templateUrl: './suspended.component.html',
  styleUrls: ['./suspended.component.scss']
})
export class SuspendedComponent implements OnInit {
  user = { id: '', email: '', can_referee: '', can_organize: '', status: '' };
  person = { id: '', firstname: '', middlenames: '', lastname: '', dob: '' };


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
        this.user = res;

        this.person = res.person;
        // this.isLoading = false;
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

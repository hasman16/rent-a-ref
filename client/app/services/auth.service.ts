import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
  // currentUser;

  constructor(private userService: UserService,
    private router: Router) {
    const token = null; // localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      // this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(res);
        console.log('From the  Auth: ', res);
        // console.log('decodedUser: ' + decodedUser);
        // Organizer
        switch (res.user.can_organize + ' ' + res.user.status) {
          case ('pending standby'):
            // The organizer has not yet completed the profile
            // this.router.navigate(['user/' + res.user.id + '/edit-profile']);
            break;
          case ('yes active'):
            // The organizer is active and ready to go
            // this.router.navigate(['user/' + res.user.id + '/account']);
            break;
          case ('yes locked'):
            // The Organizer account is suspended due to failed login attempts
            // Kill his session
            this.loggedIn = false;
            this.isAdmin = false;
            this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
            break;
          case ('no banned'):
            // The Organizer account is disabled by the admin
            // Kill his session
            this.loggedIn = false;
            this.isAdmin = false;
            this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
           // this.currentUser = { username: '', role: '' };
            break;
        }

        // Referee
        switch (res.user.can_referee + ' ' + res.user.status) {
          case ('pending active'):
            // The referee account has been activated by the admin. Now he needs to complete his profile
            // this.router.navigate(['user/' + res.user.id + '/edit-profile']);
            break;
          case ('pending in_progress'):
            // The referee account has not yet been activated by the admin. Still in Standby
            // Kill his session
            this.loggedIn = false;
            this.isAdmin = false;
            this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
            // this.router.navigate(['user/' + res.user.id + '/standby']);
            break;
          case ('yes active'):
            // The referee is active and ready to go
            // this.router.navigate(['user/' + res.user.id + '/account']);
            break;
          case ('yes locked'):
            // The referee account is suspended due to failed login attempts
            // Kill his session
            this.loggedIn = false;
            this.isAdmin = false;
            this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
            break;
          case ('no banned'):
            // The referee account is disabled by the admin
            // Kill his session
            this.loggedIn = false;
            this.isAdmin = false;
            this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
            break;
        }
        return res;
      },
      error => console.log('Error MSG: ', error)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { email: '', role: '', id: '', firstname: '', lastname: '', can_organize: '', can_referee: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(res) {
    this.loggedIn = true;

    this.currentUser.email = res.user.email;
    this.currentUser.id = res.user.id;
    this.currentUser.firstname = res.user.firstname;
    this.currentUser.lastname = res.user.lastname;

    if (res.user.can_organize === 'yes') {
      this.currentUser.role = 'Organizer';
    }
    if (res.user.can_referee === 'yes') {
      this.currentUser.role = 'Referee';
    }

    // decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    // delete decodedUser.role;
  }

}

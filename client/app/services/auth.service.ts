import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Login } from './../shared/models/login';
import { User } from './../shared/models/user';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;

  public currentUser:User = <User>{};

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router) {

    const user = localStorage.getItem('user');
    if (user) {
      this.setCurrentUser(JSON.parse(user));
    }
  }

  protected resetState(): void {
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = <User>{};
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      (login:Login) => {
        const newUser = login.user;
        this.setCurrentUser({
          user: newUser,
          token: login.token
        });

        // Organizer
        switch (newUser.can_organize + ' ' + newUser.status) {
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

            this.resetState();
            break;
          case ('no banned'):
            // The Organizer account is disabled by the admin
            // Kill his session
            this.resetState();
            break;
        }

        // Referee
        switch (login.user.can_referee + ' ' + login.user.status) {
          case ('pending active'):
            // The referee account has been activated by the admin. Now he needs to complete his profile
            // this.router.navigate(['user/' + res.user.id + '/edit-profile']);
            break;
          case ('pending in_progress'):
            // The referee account has not yet been activated by the admin. Still in Standby
            // Kill his session

            this.resetState();
            break;
          case ('yes active'):
            // The referee is active and ready to go
            // this.router.navigate(['user/' + res.user.id + '/account']);
            break;
          case ('yes locked'):
            // The referee account is suspended due to failed login attempts
            // Kill his session

            this.resetState();
            break;
          case ('no banned'):
            // The referee account is disabled by the admin
            // Kill his session

            this.resetState();
            break;
        }
        return login;
      },
      error => console.log('Error MSG: ', error)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.resetState();
    this.setCurrentUser(null);
    this.router.navigate(['/']);
  }

  resetpassword(payload) {
    return this.userService.resetpassword(payload).map(res => res.json()).map(
      res => {
        return res;
      }
    );
  }

  setCurrentUser(setter) {
    this.resetState();
    this.tokenService.setOptions(null);
    localStorage.removeItem('user');

    if (setter) {
      const newUser = setter.user;
      const authorization = newUser.authorization;
      this.loggedIn = true;
      this.currentUser = newUser;
      // ============================
      this.currentUser.email = setter.user.email;
      this.currentUser.id = setter.user.id;
      this.currentUser.firstname = setter.user.firstname;
      this.currentUser.lastname = setter.user.lastname;

      if (setter.user.can_organize === 'yes') {
        this.currentUser.role = 'Organizer';
      }
      if (setter.user.can_referee === 'yes') {
        this.currentUser.role = 'Referee';
      }
      // ============================
      this.isAdmin = (authorization === 1 || authorization === 2);
      this.tokenService.setOptions(setter.token);
      localStorage.setItem('user', JSON.stringify(setter));
    }

  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Login, User } from './../shared/models/index';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isActive: boolean = false;

  public currentUser: User = <User>{};

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.setCurrentUser(JSON.parse(user));
    }
  }

  protected resetState(): void {
    this.loggedIn = false;
    this.isAdmin = false;
    this.isActive = false;
    this.currentUser = <User>{};
  }

  login(emailAndPassword) {
    return this.userService
      .login(emailAndPassword)
      .take(1)
      .map(
        (login: Login) => {
          const newUser = login.user;
          this.setCurrentUser({
            user: newUser,
            token: login.token
          });

          // Organizer
          switch (newUser.can_organize + ' ' + newUser.status) {
            case 'pending standby':
              break;
            case 'yes active':
              break;
            case 'yes locked':
              this.resetState();
              break;
            case 'no banned':
              this.resetState();
              break;
          }

          // Referee
          switch (newUser.can_referee + ' ' + newUser.status) {
            case 'pending active':
              break;
            case 'pending in_progress':
              this.resetState();
              break;
            case 'yes active':
              break;
            case 'yes locked':
              this.resetState();
              break;
            case 'no banned':
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
    return this.userService
      .resetpassword(payload)
      .take(1)
      .map(res => res.json());
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
      this.currentUser.email = newUser.email;
      this.currentUser.id = newUser.id;
      this.currentUser.firstname = setter.user.firstname;
      this.currentUser.lastname = setter.user.lastname;

      if (setter.user.can_organize === 'yes') {
        this.currentUser.role = 'Organizer';
      }
      if (setter.user.can_referee === 'yes') {
        this.currentUser.role = 'Referee';
      }
      // ============================
      this.isAdmin = authorization === 1 || authorization === 2;
      this.isActive = newUser.status == 'active';
      this.tokenService.setOptions(setter.token);
      localStorage.setItem('user', JSON.stringify(setter));
    }
  }
}

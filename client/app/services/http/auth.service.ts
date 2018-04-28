import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../interceptors/index';
import { UserService } from './user.service';
import { Login, User } from './../../shared/models/index';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isActive: boolean = false;

  private currentUser: User = <User>{};

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

  public resetState(): void {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.isAdmin = false;
    this.isActive = false;
    this.currentUser = <User>{};
  }

  public getCurrentUser(): User {
    return _.cloneDeep(this.currentUser);
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).do((login: Login) => {
      this.setCurrentUser({
        user: login.user,
        token: login.token
      });
    });
  }

  logout() {
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

    if (setter) {
      const newUser = setter.user;
      const authorization = newUser.authorization;
      this.loggedIn = true;
      this.currentUser = newUser;
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

      this.isAdmin = authorization === 1 || authorization === 2;
      this.isActive = newUser.status == 'active';
      this.tokenService.setOptions(setter.token);
      localStorage.setItem('user', JSON.stringify(setter));
    }
  }
}

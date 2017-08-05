import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { username: '', role: '' };

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
        this.setCurrentUser();
        return res;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { username: '', role: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser() {
    this.loggedIn = true;
    this.currentUser.username = 'Admin';
    this.currentUser.role = 'no role';
    //decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    //delete decodedUser.role;
  }

}

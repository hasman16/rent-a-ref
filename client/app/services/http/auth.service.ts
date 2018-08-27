import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../interceptors/index';
import { UserService } from './user.service';
import { Login, User } from './../../shared/models/index';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private loginStatusSubject$: Subject<boolean> = new Subject<boolean>();
  public loginStatus$: Observable<
    boolean
  > = this.loginStatusSubject$.asObservable();
  private adminStatusSubject$: Subject<boolean> = new Subject<boolean>();
  public adminStatus$: Observable<
    boolean
  > = this.adminStatusSubject$.asObservable();
  private activeStatusSubject$: Subject<boolean> = new Subject<boolean>();
  public activeStatus$: Observable<
    boolean
  > = this.activeStatusSubject$.asObservable();
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isActive: boolean = false;
  public SITE_KEY: string;

  private currentUser: User = <User>{};

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    this.logout();
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
    this.authObservables();
  }

  public authObservables(): void {
    this.loginStatusSubject$.next(this.loggedIn);
    this.adminStatusSubject$.next(this.isAdmin);
    this.activeStatusSubject$.next(this.isActive);
  }

  private redirectUser(userStatus: string, userId: string) {
    let path: string = '';
    switch (userStatus) {
      case 'active':
        path = `account/${userId}/profile`;
        break;
      case 'pending':
        path = `account/${userId}/standby`;
        break;
      case 'locked':
        path = `account/${userId}/suspended`;
        break;
      case 'banned':
        path = `account/${userId}/deactivated`;
        this.resetState();
        break;
      default:
        path = '/';
        this.resetState();
        break;
    }
    return path;
  }

  public getCurrentUser(): User {
    return _.cloneDeep(this.currentUser);
  }

  public login(emailAndPassword) {
    this.logout();
    return this.userService.login(emailAndPassword).pipe(
      tap(
        (login: Login) => {
          const user: User = login.user;
          const userId = user.id;
          const userStatus = user.status;
          const path: string = this.redirectUser(userStatus, userId);

          if (path) {
            this.setCurrentUser({
              user: login.user,
              token: login.token
            });
          }

          this.router.navigate([path]);
        },
        () => {
          this.logout();
        }
      )
    );
  }

  public pulse() {
    this.userService.pulse().subscribe(
      (login: Login) => {
        const user: User = login.user;
        const userId = user.id;
        const userStatus = user.status;
        const path: string = this.redirectUser(userStatus, userId);

        if (path) {
          this.setCurrentUser({
            user: login.user,
            token: login.token
          });
        }

        this.router.navigate([path]);
      },
      () => {
        this.logout();
      }
    );
  }

  public logout() {
    this.resetState();
    this.tokenService.setOptions(null);
    this.router.navigate(['/']);
  }

  public resetpassword(payload) {
    return this.userService
      .resetpassword(payload)
      .pipe(take(1), map(res => res.json()));
  }

  private setCurrentUser(setter) {
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
      this.isActive = newUser.status === 'active';
      this.tokenService.setOptions(setter.token);
      localStorage.setItem('user', JSON.stringify(setter));
      this.authObservables();
    }
  }
}

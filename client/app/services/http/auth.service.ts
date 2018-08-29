import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../interceptors/index';
import { UserService } from './user.service';
import { Login, User } from './../../shared/models/index';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private loginStatusSubject$: BehaviorSubject<boolean>;

  private adminStatusSubject$: BehaviorSubject<boolean>;
  private activeStatusSubject$: BehaviorSubject<boolean>;
  private idleTextSubject$: BehaviorSubject<string>;

  public loginStatus$: Observable<boolean>;
  public adminStatus$: Observable<boolean>;
  public activeStatus$: Observable<boolean>;

  public idleText$: Observable<string>;

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
    this.loginStatusSubject$ = new BehaviorSubject(false);
    this.adminStatusSubject$ = new BehaviorSubject(false);
    this.activeStatusSubject$ = new BehaviorSubject(false);
    this.idleTextSubject$ = new BehaviorSubject('');

    this.loginStatus$ = this.loginStatusSubject$
      .asObservable()
      .pipe(distinctUntilChanged());

    this.adminStatus$ = this.adminStatusSubject$
      .asObservable()
      .pipe(distinctUntilChanged());

    this.activeStatus$ = this.activeStatusSubject$
      .asObservable()
      .pipe(distinctUntilChanged());

    this.idleText$ = this.idleTextSubject$
      .asObservable()
      .pipe(distinctUntilChanged());

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

  public setIdleText(text: string): void {
    this.idleTextSubject$.next(text);
  }

  private redirectLoginPath(userStatus: string, userId: string) {
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
        break;
      default:
        path = '/';
        break;
    }
    return path;
  }

  public getCurrentUser(): User {
    return _.cloneDeep(this.currentUser);
  }

  private processLoginOrPulse(login: Login, isPulse: boolean): void {
    const user: User = login.user;
    const userId = user.id;
    const userStatus = user.status;
    const path: string = this.redirectLoginPath(userStatus, userId);

    if (userStatus === 'banned' || path === '/') {
      this.resetState();
      this.router.navigate([path]);
    } else {
      this.setCurrentUser({
        user: login.user,
        token: login.token
      });
      if (!isPulse) {
        this.router.navigate([path]);
      }
    }
  }

  public login(emailAndPassword) {
    this.logout();
    return this.userService.login(emailAndPassword).pipe(
      tap(
        (login: Login) => {
          this.processLoginOrPulse(login, false);
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
        this.processLoginOrPulse(login, true);
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

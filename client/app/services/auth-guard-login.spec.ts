import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuardLogin } from './auth-guard-login.service';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let mockAuthService = {
    loggedIn: false,
    isActive: false,
    currentUser: {
      status: ''
    }
  };

  function setUp(mockAuthService) {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardLogin,
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
      imports: [RouterTestingModule]
    });
  }

  describe(' test not loggedIn', () => {
    beforeEach(() => {
      mockAuthService.loggedIn = false;
      mockAuthService.isActive = false;
      setUp(mockAuthService);
    });

    // inject your guard service AND Router
    it(
      'checks if a user is valid',
      async(
        inject(
          [AuthGuardLogin, Router, AuthService],
          (authGuardLogin, router, authService) => {
            spyOn(router, 'navigate');
            expect(authGuardLogin.canActivate()).toBeFalsy();
            expect(authService.loggedIn).toBeFalsy();
            expect(authService.isActive).toBeFalsy();
            expect(router.navigate).toHaveBeenCalled();
          }
        )
      )
    );
  });

  describe('test user loggedIn', () => {
    beforeEach(() => {
      mockAuthService.loggedIn = true;
      mockAuthService.isActive = true;
      setUp(mockAuthService);
    });

    it(
      'should return true',
      async(
        inject(
          [AuthGuardLogin, Router, AuthService],
          (authGuardLogin, router, authService) => {
            spyOn(router, 'navigate');

            expect(authGuardLogin.canActivate()).toBeTruthy();
            expect(authService.loggedIn).toBeTruthy();
            expect(authService.isActive).toBeTruthy();
            expect(router.navigate).not.toHaveBeenCalled();
          }
        )
      )
    );
  });
});

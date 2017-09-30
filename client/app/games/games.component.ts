import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from './../services/can-deactivate-guard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../services/profile.service';

@Component({
        selector: 'app-games',
        templateUrl: './games.component.html',
        styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, CanComponentDeactivate {
        isLoading = true;
        allowEdit = false;

        constructor(public auth: AuthService,
                public toast: ToastComponent, private profileService: ProfileService, private router: Router,
                private userService: UserService) { }

        ngOnInit() {
                // this.getUsers();
                this.isLoading = false;
        }
        canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
                if (!this.allowEdit) {
                        return true;
                }
        }
}

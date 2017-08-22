import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';
  data = {};
  user = {};
  address = { id: '', line1: '', line2: '', city: '', state: '', zip: '' };
  isLoading = true;
  allowEdit = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    /*
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }*/
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser.id).subscribe(
      // data => this.user = data,
      res => {
        this.data = res;
        // this.toast.setMessage(res.message, 'success');
        console.log('Response data: ' + JSON.stringify(res));
        console.log('status: ' + res.id + ' Message: ' + res.firstname);
      },
      error => console.log('Get user error: ', error),
      () => this.isLoading = false
    );
    console.log('data: ' + JSON.stringify(this.data));
  }


  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}

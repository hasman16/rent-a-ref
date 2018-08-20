import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.loggedIn) {
      this.auth.logout();
    }
  }
}

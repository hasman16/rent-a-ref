import { Component, EventEmitter, Output, OnInit, Directive } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();
  // This featureSelected would be use in the app.component.html
  constructor(public auth: AuthService) { }

  ngOnInit() {
    // Check if session valid
    if (!this.auth.loggedIn) {
      this.auth.logout();
    }
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

}


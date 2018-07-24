import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Directive
} from '@angular/core';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  constructor(public auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.loggedIn) {
      this.auth.logout();
    }
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}

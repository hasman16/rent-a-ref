import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suspended',
  templateUrl: './suspended.component.html',
  styleUrls: ['./suspended.component.scss']
})
export class SuspendedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.router.navigate(['passwordreset']);
}
}

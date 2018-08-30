import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'rar-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, CanComponentDeactivate {
  protected available: any = {};

  constructor() {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  public onOfficials() {
    //this.router.navigate(['admin/officials']);
  }

  public onAssigning() {
    //this.router.navigate(['admin/games']);
  }
}

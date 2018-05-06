import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public dt: Date = new Date();
  public selectLoad = true;
  public privacy = false;
  public year: number = new Date().getFullYear();
  constructor() {}

  ngOnInit() {}

  public getDate(): number {
    return (this.dt && this.dt.getTime()) || new Date().getTime();
  }

  public today(): void {
    this.dt = new Date();
  }
}

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'event-order-table',
  templateUrl: './event-order-table.component.html',
  styleUrls: ['./event-order-table.component.scss']
})
export class EventOrderTableComponent implements OnInit {
  @Input() public model: any;
  constructor() {}

  ngOnInit() {}
}

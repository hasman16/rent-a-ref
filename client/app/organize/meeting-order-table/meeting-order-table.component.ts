import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
	selector: 'meeting-order-table',
	templateUrl: './meeting-order-table.component.html',
	styleUrls: ['./meeting-order-table.component.scss']
})
export class MeetingOrderTableComponent implements OnInit {
	@Input() public model: any;
	constructor() {}

	ngOnInit() {}
}

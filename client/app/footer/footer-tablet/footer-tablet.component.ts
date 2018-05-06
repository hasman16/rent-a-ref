import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer-tablet',
	templateUrl: './footer-tablet.component.html',
	styleUrls: ['./footer-tablet.component.scss']
})
export class FooterTabletComponent implements OnInit {
	public year: number = new Date().getFullYear();
	constructor() {}

	ngOnInit() {}
}

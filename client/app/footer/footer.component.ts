import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	public dt: Date = new Date();
	public terms = false;
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

	showPrivacy(): void {
		this.privacy = true;
		this.hideTerms(null);
	}

	hidePrivacy(event): void {
		this.privacy = false;
	}

	showTerms(): void {
		this.terms = true;
		this.hidePrivacy(null);
	}

	hideTerms(event): void {
		this.terms = false;
	}
}

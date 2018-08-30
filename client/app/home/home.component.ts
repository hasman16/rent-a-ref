import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public chartData: Array<any>;
	public bottomCarousel: Array<any> = [];
	constructor() {
		this.bottomCarousel = [
			{
				url: './assets/images/quote2.jpg',
				text:
					'We are proud to have Rent-A-Ref as the exclusive officiating provider for all of the Wooter leagues. Great Service, Great Price, Great Refs. Thank you!',
				author: 'David',
				quote: '<a src="https://wooter.co/">COO, Wooter</a></span>'
			},
			{
				url: '/assets/images/quote1.jpg',
				text:
					"Rent-A-Ref allows me to do what I love when I want to. Not only am I notified when there are games near by, but they also take care of the payment and deposit it into my bank account, so I don't have to ask each team to pay.",
				author: 'Carlon',
				quote: 'Sports Official'
			},
			{
				url: '/assets/images/quote.jpg',
				text:
					"ASportsNet partnered with Rent-A-Ref to begin scheduling our expanding soccer and basketball programs. With a vast network of experienced and trained referees, we've been able to keep up with the growth of our leagues thanks to Rent-A-Ref.",
				author: 'Anthony',
				quote: '<a src="https://lasportsnet.com/" >CMO, LASportsNet</a>'
			},
			{
				url: '/assets/images/ndoung.jpeg',
				text:
					'As a soccer referee, we need a platform that is easily manageable and user-friendly. Rent-A-Ref offers us the right tools so we can focus on officiating and stay on top of ever changing schedule.',
				autor: 'Ndoung',
				quote:
					'<a src="http://www.hasmandesign.com">Fullstack Engineer, Solera</a></span>'
			}
		];
	}

	ngOnInit() {}
}

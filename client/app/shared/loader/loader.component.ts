import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
	selector: 'rar-loader',
	templateUrl: 'loader.component.html',
	styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
	public show: boolean = false;

	private subscription: Subscription = new Subscription();

	constructor(private loaderService: LoaderService) {}

	ngOnInit() {
		this.subscription.add(
			this.loaderService.loaderState.subscribe((state: LoaderState) => {
				this.show = state.show;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

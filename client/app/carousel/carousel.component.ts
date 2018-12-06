import {
	Component,
	AfterContentInit,
	Input,
	ContentChildren,
	QueryList
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html'
})
export class CarouselComponent implements AfterContentInit {
	@Input() delay = 0;
	@ContentChildren(CarouselItemComponent)
	items: QueryList<CarouselItemComponent>;
	public activeItem: number;

	ngAfterContentInit() {
		this.activeItem = 0;
		const arrItems: CarouselItemComponent[] = this.items.toArray();
		const TOTAL_ITEMS: number = arrItems.length;

		setInterval(() => {
			arrItems.forEach(
				(c: CarouselItemComponent, i: number) =>
					(c.isActive = i === this.activeItem)
			);
			this.activeItem = this.activeItem++ % TOTAL_ITEMS;
		}, this.delay);
	}
}

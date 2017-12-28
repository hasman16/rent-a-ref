import {
  Component,
  AfterContentInit,
  Input,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements AfterContentInit {
  @Input() delay = 0;
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;
  activeItem: number;

  ngAfterContentInit() {
    this.activeItem = 0;
    const arrItems = this.items.toArray();
    const max = arrItems.length;

    setInterval(() => {
      for (let i = 0; i < max; i++) {
        arrItems[i].isActive = (i === this.activeItem);
      }
      this.activeItem = (this.activeItem + 1) % max;
    }, this.delay)
  }
}

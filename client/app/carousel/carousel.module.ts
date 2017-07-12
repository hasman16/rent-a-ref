import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarouselComponent, CarouselItemComponent],
  providers: [],
  exports: [CarouselComponent]
})
export class CarouselModule { }

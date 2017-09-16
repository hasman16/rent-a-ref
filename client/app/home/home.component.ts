import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// import our Carousel Component
// import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
   // When the DOM is ready, run this function
$(document).ready(function() {
  // Set the carousel options
  $('#header-carousel').carousel({
    pause: true,
    interval: 100000,
  });
  $('#news-carousel').carousel({
    pause: true,
    interval: 20000,
  });
  $('#quote-carousel').carousel({
    pause: true,
    interval: 15000,
  });
});
  }

  ngOnInit() {
  }

}

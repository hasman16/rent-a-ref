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
  $('#quote-carousel').carousel({
    pause: true,
    interval: 8000,
  });
});

// News start
const link = $('.com__nav-link');
const linkParent = link.parent('li');
const section = $('.com__section');
const sectionContent = section.find('*');

const switchTab = function () {
const p = $(this).parent('li');
const i = p.index();
const s = section.eq(i);
const c = s.find('*');

  section.removeClass('active');
  sectionContent.removeAttr('style');
  s.addClass('active');

  c.css({
    transform: 'none',
    opacity: 1
  });

  linkParent.removeClass('active');
  p.addClass('active');

  return false;
};

link.on('click', switchTab);

function activeFirst() {
  section.first().addClass('active');
  section.first().find('*').css({
    transform: 'none',
    opacity: 1
  });
  linkParent.first().addClass('active');
}

activeFirst();
// News end
  }

  ngOnInit() {
  }

}

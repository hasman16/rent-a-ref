import { Component, NgZone, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  windowWidth: number = window.innerWidth;

  constructor(public auth: AuthService, private ngZone: NgZone) {

    const destination_anim_bgs = [
      'assets/images/refereebg.jpg',
      'assets/images/refereebg1.jpg',
      'assets/images/refereebg2.jpg',
      'assets/images/refereebg3.jpg',
      'assets/images/refereebg4.jpg',
      'assets/images/refereebg5.jpg',
      'assets/images/refereebg6.jpg',
      'assets/images/refereebg7.jpg',
      'assets/images/refereebg8.jpg',
      'assets/images/refereebg9.png',
      'assets/images/refereebg10.jpg',
      'assets/images/refereebg11.jpg',
      'assets/images/refereebg12.jpg'];

    $(document).ready(function() {
      let imgArr = destination_anim_bgs;

      /* preload images */
      const preloadArr = imgArr.map((image) => {
        let img = new Image();
        img.src = image;
        return img;
      });

      let currImg = 0;
      const totalImages = preloadArr.length;

      /* image rotator */
      function changeImg() {
        $('#master-wrapper')
          .animate({ opacity: 0 }, 200, function() {
            $(this).css(
              'background',
              'url(' +
                preloadArr[currImg++ % totalImages].src +
                ') fixed center'
            );
          })
          .animate({ opacity: 1 }, 200);
      }
    });
  }
}

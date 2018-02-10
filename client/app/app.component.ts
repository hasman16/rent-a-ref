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
      console.log('Width on resize 1: ' + window.innerWidth);
      console.log('Height on resize 2: ' + window.innerHeight);

    const destination_anim_bgs = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg12.jpg');


    // destination_anim_bgs = [];

    destination_anim_bgs.push('assets/images/refereebg2.jpg', 'assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg');
    destination_anim_bgs.push('assets/images/refereebg5.jpg', 'assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg');
    destination_anim_bgs.push('assets/images/refereebg8.jpg', 'assets/images/refereebg9.png', 'assets/images/refereebg10.jpg');
    destination_anim_bgs.push('assets/images/refereebg11.jpg');
    // destination_anim_bgs.push(destination_anim_bgs2);
    // destination_anim_bgs.push(destination_anim_bgs3);
    $(document).ready(function () {

      let imgArr = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg2.jpg');

      imgArr.push('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
      imgArr.push('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');
      imgArr.push('assets/images/refereebg9.png', 'assets/images/refereebg10.jpg', 'assets/images/refereebg11.jpg');
      imgArr.push('assets/images/refereebg12.jpg');
     // imgArr.push(imgArr3);

      if (destination_anim_bgs[0]) {
        imgArr = destination_anim_bgs;
      }

      const preloadArr = new Array();
      let i;

      /* preload images */
      for (i = 0; i < imgArr.length; i++) {
        preloadArr[i] = new Image();
        preloadArr[i].src = imgArr[i];
      }

      let currImg = 0;

      /* image rotator */
      function changeImg() {
        $('#master-wrapper').animate({ opacity: 0 }, 200, function () {
          $(this).css('background', 'url(' + preloadArr[currImg++ % preloadArr.length].src + ') fixed center');
        }).animate({ opacity: 1 }, 200);
      }

    });
   }

}

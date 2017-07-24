import { Component, NgZone, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  /*innerHeight: any;
  innerWidth: any;*/
  windowWidth: number = window.innerWidth;
  /*ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }*/
  constructor(public auth: AuthService, private ngZone: NgZone) {
    // Screen size example 1
      /*this.innerHeight = (window.screen.height) + 'px';
      this.innerWidth = (window.screen.width) + 'px"'
      console.log('Screen width: ' + this.innerWidth);
      console.log('Screen height: ' + this.innerHeight);*/

      console.log('Width on resize 1: ' + window.innerWidth);
      console.log('Height on resize 2: ' + window.innerHeight);

    // Screen size example 2
      window.onresize = (e) => {
        ngZone.run(() => {
          this.windowWidth = window.innerWidth;
          console.log('Width on resize: ' + window.innerWidth);
          console.log('Height on resize: ' + window.innerHeight);
        });
      };


    // alert('testing');
    const destination_anim_bgs = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg2.jpg');
    const destination_anim_bgs2 = new Array('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
    const destination_anim_bgs3 = new Array('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');

    // destination_anim_bgs = [];

    destination_anim_bgs.push('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
    destination_anim_bgs.push('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');
    // destination_anim_bgs.push(destination_anim_bgs2);
    // destination_anim_bgs.push(destination_anim_bgs3);
    $(document).ready(function () {

      let imgArr = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg2.jpg');
      // const imgArr2 = new Array('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
     // const imgArr3 = new Array('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');

      // let imgArr = [];

      imgArr.push('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
      imgArr.push('assets / images / refereebg6.jpg', 'assets/ images / refereebg7.jpg', 'assets/ images / refereebg8.jpg');
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
      const intID = setInterval(changeImg, 10000);

      /* image rotator */
      function changeImg() {
        // alert('change image');
        $('#master-wrapper').animate({ opacity: 0 }, 200, function () {
          $(this).css('background', 'url(' + preloadArr[currImg++ % preloadArr.length].src + ') fixed center');
          // alert('change image again');
        }).animate({ opacity: 1 }, 200);
      }
      // $('body').css('background', 'url(' + preloadArr[currImg++ % preloadArr.length].src + ') fixed center');

    });
   }

}

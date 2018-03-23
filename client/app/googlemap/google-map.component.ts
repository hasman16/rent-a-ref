//https://sergeome.com/blog/2017/07/02/angular4-and-google-maps-native-javascript-api/
import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'rar-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  public DALLAS = { lat: 32.7767, lng: -96.7970 };
  constructor() { }

    ngOnInit() {
      let map;
      let marker;
      const DALLAS = {lat: 32.7767, lng: -96.7970};
/*
        map = new google.maps.Map(document.getElementById('map'), {
            center: DALLAS,
            zoom: 7
        });

        marker = new google.maps.Marker({
            position: DALLAS,
            map: map,
            title: 'Hello World!'
        });
        */
    }
}
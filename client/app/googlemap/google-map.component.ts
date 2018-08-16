//https://sergeome.com/blog/2017/07/02/angular4-and-google-maps-native-javascript-api/
//https://blog.ng-book.com/angular-and-google-maps-a-tutorial/
import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import * as _ from 'lodash';

declare const google: any;

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export interface Location {
  lat?: number;
  lng?: number;
  viewport?: Object;
  zoom?: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'rar-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input('show-directions') showDirections: boolean = false;
  @Input('destination')
  set setDestination(address: Location) {
    const location: Location = this.findLocation(address);
    if (location) {
      this.destination = _.cloneDeep(location);
      this.map.triggerResize();
    }
  }
  @Input('origin')
  set setOrigin(address: Location) {
    const location: Location = this.findLocation(address);
    if (location) {
      this.origin = _.cloneDeep(location);
      this.map.triggerResize();
    }
  }

  public location: Location = {
    lat: 34.05,
    lng: -118.25,
    marker: {
      lat: 34.05,
      lng: -118.25,
      draggable: false
    },
    zoom: 5
  };

  public circleRadius: number = 64373;
  public geocoder: any;
  public origin: any = {
    lat: 34.05,
    lng: -118.25
  };
  public destination: any = {
    lat: 33.803056,
    lng: -117.8325
  };
  private loading: boolean = false;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
  }

  ngOnInit() {
    this.location.marker.draggable = false;
  }

  public onDirectionChange(event): void {
    console.log('onDirectionChange:', event);
  }

  protected findLocation(address: Location): Location {
    if (address) {
      if (address.lat && address.lng) {
        return <Location>_.cloneDeep(address);
      } else {
        try {
          let location: Location | any = this.getAddress(address);
          return location;
        } catch (e) {
          return null;
        }
      }
    }
  }

  protected async getAddress(address: Location) {
    let addressArray: any[] = [
      address.address_level_1,
      address.address_level_2,
      address.address_state,
      address.address_zip
    ];
    let addressString = addressArray.join(' ');

    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    const geocoder: any = this.geocoder;

    return new Promise(function(resolve, reject) {
      geocoder.geocode(
        {
          address: address
        },
        (results, status) => {
          console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {
            let location: Location = {
              lat: 0,
              lng: 0,
              zoom: 1
            };

            for (var i = 0; i < results[0].address_components.length; i++) {
              let types = results[0].address_components[i].types;
              console.log(types);
              if (types.indexOf('locality') != -1) {
                location.address_level_2 =
                  results[0].address_components[i].long_name;
              }
              if (types.indexOf('country') != -1) {
                location.address_country =
                  results[0].address_components[i].long_name;
              }
              if (types.indexOf('postal_code') != -1) {
                location.address_zip =
                  results[0].address_components[i].long_name;
              }
              if (types.indexOf('administrative_area_level_1') != -1) {
                location.address_state =
                  results[0].address_components[i].long_name;
              }
            }
            if (results[0].geometry.location) {
              location.lat = results[0].geometry.location.lat();
              location.lng = results[0].geometry.location.lng();
              location.marker.lat = results[0].geometry.location.lat();
              location.marker.lng = results[0].geometry.location.lng();
              location.marker.draggable = true;
              location.viewport = results[0].geometry.viewport;
            }

            resolve(location);
          } else {
            reject('Sorry, this search produced no results.');
          }
        }
      );
    });
  }

  protected milesToRadius(value): void {
    this.circleRadius = value / 0.00062137;
  }

  public circleRadiusInKm(): number {
    return this.circleRadius / 1000;
  }

  public circleRadiusInMiles(): number {
    return this.circleRadius * 0.00062137;
  }
}

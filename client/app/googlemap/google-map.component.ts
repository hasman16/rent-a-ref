//https://sergeome.com/blog/2017/07/02/angular4-and-google-maps-native-javascript-api/
//https://blog.ng-book.com/angular-and-google-maps-a-tutorial/
import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  NgZone,
  OnInit
} from '@angular/core';
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
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit {
  @Input('show-directions') public showDirections: boolean = false;
  @Input('destination')
  set setDestination(address: Location) {
    this.setAddress(address, (newAddress: Location) => {
      this.destination = _.cloneDeep(newAddress);
      this.location = _.cloneDeep(newAddress);
    });
  }

  @Input('origin')
  set setOrigin(address: Location) {
    this.setAddress(address, (newAddress: Location) => {
      this.origin = _.cloneDeep(newAddress);
      this.showDirections = true;
    });
  }
  public circleRadius: number = 64373;
  public location: Location;
  public origin: Marker;
  public destination: Marker;
  public geocoder: any;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private cd: ChangeDetectorRef,
    private mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.location = <Location>{
      lat: 34.05,
      lng: -118.25,
      marker: {
        lat: 34.05,
        lng: -118.25,
        draggable: false
      },
      zoom: 5
    };
    this.origin = <Marker>{
      lat: 34.05,
      lng: -118.25
    };
    this.destination = <Marker>{
      lat: 33.803056,
      lng: -117.8325
    };
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.location.marker.draggable = false;
  }

  public onDirectionChange(event): void {
    console.log('onDirectionChange:', event);
  }

  protected setAddress(address: Location, callback): void {
    if (address) {
      this.findLocation(address)
        .then((location: Location) => {
          if (location) {
            location.zoom = 1;
            location.marker = {
              lat: location.lat,
              lng: location.lng,
              draggable: false
            };
            callback(location);
            this.cd.markForCheck();
          }
        })
        .catch(error => {});
    }
  }

  protected async findLocation(address: Location) {
    if (address) {
      if (address.lat && address.lng) {
        return Promise.resolve(<Location>_.cloneDeep(address));
      } else {
        return this.getAddress(address);
      }
    } else {
      return Promise.resolve(null);
    }
  }

  protected async getAddress(address: Location) {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    const geocoder: any = this.geocoder;
    const addressString: string = this.convertLocationoString(address);

    return new Promise(function(resolve, reject) {
      geocoder.geocode(
        {
          address: addressString
        },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let location: Location = {
              lat: 0,
              lng: 0,
              marker: {
                lat: 0,
                lng: 0,
                draggable: false
              },
              zoom: 1
            };
            const result = _.head(results);
            const length = result.address_components.length;
            for (let i = 0; i < length; i++) {
              const address_components = result.address_components[i];
              const types = address_components.types;

              if (_.includes(types, 'locality')) {
                location.address_level_2 = address_components.long_name;
              }
              if (_.includes(types, 'country')) {
                location.address_country = address_components.long_name;
              }
              if (_.includes(types, 'postal_code')) {
                location.address_zip = address_components.long_name;
              }
              if (_.includes(types, 'administrative_area_level_1')) {
                location.address_state = address_components.long_name;
              }
            }

            if (results && result.geometry && result.geometry.location) {
              const geometry = result.geometry;
              location.lat = geometry.location.lat();
              location.lng = geometry.location.lng();
              location.marker.lat = location.lat;
              location.marker.lng = location.lng;
              location.marker.draggable = true;
              location.viewport = geometry.viewport;
            }
            resolve(location);
          } else {
            reject('Sorry, this search produced no results.');
          }
        }
      );
    });
  }

  protected convertLocationoString(address: Location): string {
    let addressArray: any[] = [
      address.address_level_1,
      address.address_level_2,
      address.address_state,
      address.address_zip
    ];
    return addressArray.join(' ');
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

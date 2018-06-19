"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://sergeome.com/blog/2017/07/02/angular4-and-google-maps-native-javascript-api/
var core_1 = require("@angular/core");
var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent() {
        this.DALLAS = { lat: 32.7767, lng: -96.7970 };
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        var map;
        var marker;
        var DALLAS = { lat: 32.7767, lng: -96.7970 };
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
    };
    GoogleMapComponent = __decorate([
        core_1.Component({
            selector: 'rar-google-map',
            templateUrl: './google-map.component.html',
            styleUrls: ['./google-map.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
//# sourceMappingURL=google-map.component.js.map
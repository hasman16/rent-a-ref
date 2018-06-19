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
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/take");
var CropImageModalService = /** @class */ (function () {
    function CropImageModalService(http) {
        this.http = http;
        this.modalSubject = new Subject_1.Subject();
        this.cropImageSubject = new Subject_1.Subject();
        this.modalState$ = this.modalSubject.asObservable();
        this.cropImageSubject$ = this.cropImageSubject.asObservable();
    }
    CropImageModalService.prototype.show = function () {
        this.modalSubject.next(true);
    };
    CropImageModalService.prototype.hide = function () {
        this.modalSubject.next(false);
    };
    CropImageModalService.prototype.message = function (cropImageState) {
        this.cropImageSubject.next(cropImageState);
    };
    CropImageModalService.prototype.uploadImage = function (destination, formData) {
        return this.http.post(destination, formData, { reportProgress: true });
    };
    CropImageModalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CropImageModalService);
    return CropImageModalService;
}());
exports.CropImageModalService = CropImageModalService;
//# sourceMappingURL=crop-image-modal.service.js.map
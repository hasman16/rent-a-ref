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
var toast_service_1 = require("./../toast/toast.service");
var UploaderComponent = /** @class */ (function () {
    function UploaderComponent(elem, renderer, toastService) {
        this.elem = elem;
        this.renderer = renderer;
        this.toastService = toastService;
        this.multiple = false;
        this.selectedFiles = new core_1.EventEmitter();
        this.selectedFilesEvent = new core_1.EventEmitter();
        this.uploadLabel = 'Upload Image';
        this.files = null;
    }
    UploaderComponent.prototype.ngOnInit = function () { };
    UploaderComponent.prototype.ngOnDestroy = function () { };
    UploaderComponent.prototype.ngAfterViewInit = function () {
        this.setUp();
    };
    UploaderComponent.prototype.uploadedImages = function (images) {
        console.log('uploadedImages:', images);
        this.files = images;
        this.selectedFiles.emit(images);
    };
    UploaderComponent.prototype.uploadedImagesEvent = function ($event) {
        this.selectedFilesEvent.emit($event);
    };
    UploaderComponent.prototype.dragEnter = function ($event) {
        var nativeElement = this.uploadElement.nativeElement.parentNode;
        this.renderer.addClass(nativeElement, 'highlightDropZone');
    };
    UploaderComponent.prototype.dragDrop = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
        var dt = $event.dataTransfer;
        var files = dt.files;
        this.files = files;
        $event.target.files = files;
        this.selectedFilesEvent.emit($event);
    };
    UploaderComponent.prototype.dragOver = function ($event) {
        $event.preventDefault();
        var nativeElement = this.uploadElement.nativeElement.parentNode;
        this.renderer.addClass(nativeElement, 'highlightDropZone');
    };
    UploaderComponent.prototype.dragLeave = function ($event) {
        var nativeElement = this.uploadElement.nativeElement.parentNode;
        this.renderer.removeClass(nativeElement, 'highlightDropZone');
    };
    UploaderComponent.prototype.cleanUp = function ($event) {
        var nativeElement = this.uploadElement.nativeElement;
        nativeElement.removeEventListener(this.dragEnter);
        nativeElement.removeEventListener(this.dragOver);
        nativeElement.removeEventListener(this.dragDrop);
        nativeElement.removeEventListener(this.dragLeave);
    };
    UploaderComponent.prototype.setUp = function () {
        var nativeElement = this.uploadElement.nativeElement;
        nativeElement.addEventListener('dragenter', this.dragEnter.bind(this));
        nativeElement.addEventListener('drop', this.dragDrop.bind(this));
        nativeElement.addEventListener('dragover', this.dragOver.bind(this));
        nativeElement.addEventListener('dragleave', this.dragLeave.bind(this));
    };
    __decorate([
        core_1.ViewChild('uploader'),
        __metadata("design:type", core_1.ElementRef)
    ], UploaderComponent.prototype, "uploadElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UploaderComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], UploaderComponent.prototype, "selectedFiles", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], UploaderComponent.prototype, "selectedFilesEvent", void 0);
    UploaderComponent = __decorate([
        core_1.Component({
            selector: 'rar-uploader',
            templateUrl: './uploader.component.html',
            styleUrls: ['./uploader.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            toast_service_1.ToastService])
    ], UploaderComponent);
    return UploaderComponent;
}());
exports.UploaderComponent = UploaderComponent;
//# sourceMappingURL=uploader.component.js.map
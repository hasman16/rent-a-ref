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
var UploadButtonComponent = /** @class */ (function () {
    function UploadButtonComponent(elem, renderer, toastService) {
        this.elem = elem;
        this.renderer = renderer;
        this.toastService = toastService;
        this.multiple = false;
        this.uploadLabel = 'Upload';
        this.selectedFiles = new core_1.EventEmitter();
        this.selectedFilesEvent = new core_1.EventEmitter();
        this.uploadInput = null;
    }
    UploadButtonComponent.prototype.ngOnInit = function () { };
    UploadButtonComponent.prototype.ngOnDestroy = function () { };
    UploadButtonComponent.prototype.ngAfterViewInit = function () {
        this.addUploadElement();
    };
    UploadButtonComponent.prototype.addUploadElement = function () {
        var parent = this.boldElement.nativeElement.parentNode;
        var boldElement = this.boldElement.nativeElement;
        if (this.uploadInput) {
            this.uploadInput.removeEventListener('change', this.uploadImages);
            this.renderer.removeChild(parent, this.uploadInput);
        }
        this.uploadInput = this.renderer.createElement('input');
        this.renderer.setAttribute(this.uploadInput, 'accept', 'image/*');
        this.renderer.setAttribute(this.uploadInput, 'size', '1');
        this.renderer.setAttribute(this.uploadInput, 'type', 'file');
        this.renderer.insertBefore(parent, this.uploadInput, boldElement);
        this.uploadInput.addEventListener('change', this.uploadImages.bind(this));
    };
    UploadButtonComponent.prototype.uploadImages = function ($event) {
        var files = $event.target.files;
        console.log('!!!selected:', $event, files);
        this.selectedFiles.emit(files);
        this.selectedFilesEvent.emit($event);
        this.addUploadElement();
    };
    __decorate([
        core_1.ViewChild('someInput'),
        __metadata("design:type", core_1.ElementRef)
    ], UploadButtonComponent.prototype, "boldElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UploadButtonComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadButtonComponent.prototype, "uploadLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], UploadButtonComponent.prototype, "selectedFiles", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], UploadButtonComponent.prototype, "selectedFilesEvent", void 0);
    UploadButtonComponent = __decorate([
        core_1.Component({
            selector: 'rar-upload-button',
            templateUrl: './upload-button.component.html',
            styleUrls: ['./upload-button.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            toast_service_1.ToastService])
    ], UploadButtonComponent);
    return UploadButtonComponent;
}());
exports.UploadButtonComponent = UploadButtonComponent;
//# sourceMappingURL=upload-button.component.js.map
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
//https://github.com/Mawi137/ngx-image-cropper
var core_1 = require("@angular/core");
var index_1 = require("./../../services/index");
var crop_image_modal_service_1 = require("./crop-image-modal.service");
var crop_image_1 = require("./crop-image");
var modal_component_1 = require("./../modal/modal.component");
var CropImageModalComponent = /** @class */ (function () {
    function CropImageModalComponent(elem, renderer, cropImageModalService, organizeService) {
        this.elem = elem;
        this.renderer = renderer;
        this.cropImageModalService = cropImageModalService;
        this.organizeService = organizeService;
        this.modalName = 'xxx';
        this.title = 'Upload Image';
        this.submitText = 'Save Image';
        this.disableSubmit = true;
        this.cancelText = 'Cancel';
        this.allowImageTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png'
        ];
        this.imageChangedEvent = null;
        this.croppedImage = '';
        this.selectedTab = 'loading';
        this.subscription = [];
        this.initialImage = '';
    }
    CropImageModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.push(this.cropImageModalService.modalState$.subscribe(function (value) {
            if (value) {
                _this.uploadModal.showModal(null);
            }
            else {
                _this.uploadModal.closeModal(null);
            }
        }));
    };
    CropImageModalComponent.prototype.ngOnDestroy = function () {
        this.subscription.forEach(function (sub) { return sub.unsubscribe(); });
    };
    CropImageModalComponent.prototype.isSelectedTab = function (tab) {
        return this.selectedTab === tab;
    };
    CropImageModalComponent.prototype.switchToTab = function ($event, tab) {
        $event.preventDefault();
        this.selectedTab = tab;
    };
    CropImageModalComponent.prototype.selectedFiles = function (files) {
        this.files = files;
    };
    CropImageModalComponent.prototype.selectedFilesEvent = function (event) {
        this.imageChangedEvent = event;
        this.selectedTab = 'cropping';
    };
    CropImageModalComponent.prototype.imageCropped = function (image) {
        this.croppedImage = image;
        this.disableSubmit = false;
    };
    CropImageModalComponent.prototype.imageLoaded = function () {
        // show cropper
        console.log('show cropper');
    };
    CropImageModalComponent.prototype.loadImageFailed = function () {
        // show message
        console.log('image failed');
    };
    CropImageModalComponent.prototype.closeModal = function ($event) {
        this.cropImageModalService.message({
            uploadState: crop_image_1.UploadState.Close
        });
        this.cleanUp();
    };
    CropImageModalComponent.prototype.cleanUp = function () {
        this.selectedTab = 'loading';
        this.croppedImage = undefined;
        this.imageChangedEvent = null;
        this.destination = '';
        this.initialImage =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=	';
    };
    CropImageModalComponent.prototype.submitModal = function ($event) {
        var _this = this;
        var formData = new FormData();
        var uploadImage = this.b64toBlob(this.croppedImage);
        if (uploadImage.size > 0) {
            formData.append('photo', uploadImage);
            this.cropImageModalService
                .uploadImage(this.destination, formData)
                .subscribe(function () {
                _this.closeModal(null);
                _this.cropImageModalService.message({
                    uploadState: crop_image_1.UploadState.Success
                });
            }, function (err) {
                _this.cropImageModalService.message({
                    uploadState: crop_image_1.UploadState.Error
                });
            }, function () { return _this.cropImageModalService.hide(); });
        }
        else {
            this.cropImageModalService.message({
                uploadState: crop_image_1.UploadState.None
            });
            this.cropImageModalService.hide();
        }
    };
    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     * https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
     * @param sliceSize {Int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @return Blob
     */
    CropImageModalComponent.prototype.b64toBlob = function (b64Data, contentType, sliceSize) {
        if (b64Data === void 0) { b64Data = ''; }
        if (contentType === void 0) { contentType = 'image/png'; }
        if (sliceSize === void 0) { sliceSize = 512; }
        var byteCharacters = atob(b64Data.replace('data:image/png;base64,', ''));
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    __decorate([
        core_1.ViewChild('uploaderModal'),
        __metadata("design:type", modal_component_1.ModalComponent)
    ], CropImageModalComponent.prototype, "uploadModal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CropImageModalComponent.prototype, "destination", void 0);
    CropImageModalComponent = __decorate([
        core_1.Component({
            selector: 'rar-cropper-image-modal',
            templateUrl: './crop-image-modal.component.html',
            styleUrls: ['./crop-image-modal.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            crop_image_modal_service_1.CropImageModalService,
            index_1.OrganizeService])
    ], CropImageModalComponent);
    return CropImageModalComponent;
}());
exports.CropImageModalComponent = CropImageModalComponent;
//# sourceMappingURL=crop-image-modal.component.js.map
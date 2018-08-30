//https://github.com/Mawi137/ngx-image-cropper
import {
	Component,
	OnDestroy,
	OnInit,
	Input,
	Output,
	ElementRef,
	Renderer2,
	ChangeDetectorRef,
	ViewChild
} from '@angular/core';
import { OrganizeService } from './../../services/index';
import { CropImageModalService } from './crop-image-modal.service';
import { UploadState, CropImageState } from './crop-image';

import { ModalComponent } from './../modal/modal.component';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
	selector: 'rar-cropper-image-modal',
	templateUrl: './crop-image-modal.component.html',
	styleUrls: ['./crop-image-modal.component.scss']
})
export class CropImageModalComponent implements OnInit, OnDestroy {
	@ViewChild('uploaderModal') uploadModal: ModalComponent;
	@Input() destination: string;
	public modalName: string = 'xxx';
	public title: string = 'Upload Image';
	public submitText: string = 'Save Image';
	public disableSubmit: boolean = true;
	public cancelText: string = 'Cancel';
	protected allowImageTypes: string[] = [
		'image/jpg',
		'image/jpeg',
		'image/png'
	];
	protected imageChangedEvent: any = null;
	protected croppedImage: any = '';
	protected files: FileList;
	protected selectedTab: string = 'loading';
	protected subscription: Subscription[] = [];
	protected initialImage: string = '';

	constructor(
		private elem: ElementRef,
		private renderer: Renderer2,
		private cropImageModalService: CropImageModalService,
		private organizeService: OrganizeService
	) {}

	ngOnInit() {
		this.subscription.push(
			this.cropImageModalService.modalState$.subscribe(
				(value: boolean) => {
					if (value) {
						this.uploadModal.showModal(null);
					} else {
						this.uploadModal.closeModal(null);
					}
				}
			)
		);
	}

	ngOnDestroy(): void {
		this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
	}

	public isSelectedTab(tab: string): boolean {
		return this.selectedTab === tab;
	}

	public switchToTab($event, tab: string): void {
		$event.preventDefault();
		this.selectedTab = tab;
	}

	protected selectedFiles(files: FileList): void {
		this.files = files;
	}

	protected selectedFilesEvent(event: any): void {
		this.imageChangedEvent = event;
		this.selectedTab = 'cropping';
	}

	public imageCropped(image: string) {
		this.croppedImage = image;
		this.disableSubmit = false;
	}

	public imageLoaded() {
		// show cropper
		console.log('show cropper');
	}

	public loadImageFailed() {
		// show message
		console.log('image failed');
	}

	public closeModal($event): void {
		this.cropImageModalService.message(<CropImageState>{
			uploadState: UploadState.Close
		});
		this.cleanUp();
	}

	protected cleanUp(): void {
		this.selectedTab = 'loading';
		this.croppedImage = undefined;
		this.imageChangedEvent = null;
		this.destination = '';
		this.initialImage =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=	';
	}

	public submitModal($event): void {
		const formData = new FormData();
		const uploadImage = this.b64toBlob(this.croppedImage);

		if (uploadImage.size > 0) {
			formData.append('photo', uploadImage);
			this.cropImageModalService
				.uploadImage(this.destination, formData)
				.pipe(finalize(() => this.cropImageModalService.hide()))
				.subscribe(
					() => {
						this.closeModal(null);
						this.cropImageModalService.message(<CropImageState>{
							uploadState: UploadState.Success
						});
					},
					err => {
						this.cropImageModalService.message(<CropImageState>{
							uploadState: UploadState.Error
						});
					}
				);
		} else {
			this.cropImageModalService.message(<CropImageState>{
				uploadState: UploadState.None
			});
			this.cropImageModalService.hide();
		}
	}

	/**
	 * Convert a base64 string in a Blob according to the data and contentType.
	 * https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
	 * @param b64Data {String} Pure base64 string without contentType
	 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
	 * @param sliceSize {Int} SliceSize to process the byteCharacters
	 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
	 * @return Blob
	 */
	protected b64toBlob(
		b64Data: string = '',
		contentType: string = 'image/png',
		sliceSize: number = 512
	): Blob {
		let byteCharacters = atob(
			b64Data.replace('data:image/png;base64,', '')
		);
		let byteArrays = [];

		for (
			let offset = 0;
			offset < byteCharacters.length;
			offset += sliceSize
		) {
			let slice = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			let byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}
}

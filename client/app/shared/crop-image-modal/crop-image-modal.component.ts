//https://github.com/Mawi137/ngx-image-cropper
import {
	Component,
	OnDestroy,
	OnInit,
	ElementRef,
	Renderer2,
	ChangeDetectorRef
} from '@angular/core';
import { CropImageModalService } from './crop-image-modal.service';
import { ModalService } from './../modal/modal.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'rar-cropper-image-modal',
	templateUrl: './crop-image-modal.component.html',
	styleUrls: ['./crop-image-modal.component.scss']
})
export class CropImageModalComponent implements OnInit, OnDestroy {
	protected allowImageTypes: string[] = [
		'image/jpg',
		'image/png',
		'image/gif'
	];
	public imageChangedEvent: any = '';
	public croppedImage: any = '';
	public files: FileList;
	public selectedTab: string = 'loading';
	private subscription: Subscription[] = [];

	constructor(
		private elem: ElementRef,
		private renderer: Renderer2,
		private modalService: ModalService,
		private cropImageModalService: CropImageModalService
	) {}

	ngOnInit() {
		this.subscription.push(
			this.cropImageModalService.modalState$.subscribe(
				(value: boolean) => {
					console.log('CropImageModalComponent.value', value);
					if (value) {
						this.modalService.show();
					} else {
						this.modalService.hide();
					}
				}
			)
		);
	}

	ngOnDestroy(): void {
		this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
	}

	selectedFiles(files: FileList): void {
		this.files = files;
	}

	selectedFilesEvent(event: any): void {
		this.imageChangedEvent = event;
		this.selectedTab = 'cropping';
	}

	imageCropped(image: string) {
		this.croppedImage = image;
	}

	imageLoaded() {
		// show cropper
		console.log('show cropper');
	}

	loadImageFailed() {
		// show message
		console.log('image failed');
	}

	openModal($event): void {
		console.log('Modal Openned');
	}

	submitModal($event): void {
		console.log('submitModal Openned');
	}

	closeModal($event): void {
		console.log('Modal Closed');
	}
}

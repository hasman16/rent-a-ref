//https://github.com/Mawi137/ngx-image-cropper
import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	Output,
	OnDestroy,
	OnInit,
	ElementRef,
	Renderer2,
	ChangeDetectorRef,
	ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'rar-cropper-image-modal',
	templateUrl: './crop-image-modal.component.html',
	styleUrls: ['./crop-image-modal.component.scss']
})
export class CropImageModalComponent implements OnInit {
	protected allowImageTypes: string[] = [
		'image/jpg',
		'image/png',
		'image/gif'
	];
	public imageChangedEvent: any = '';
	public croppedImage: any = '';
	public files: FileList;
	public selectedTab: string = 'loading';

	constructor(private elem: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {}

	selectedFiles(files: FileList): void {
		console.log('CropImageModalComponent:', files);
		this.files = files;
	}

	selectedFilesEvent(event: any): void {
		console.log('CropImageModalComponent:', event);
		this.imageChangedEvent = event;
		this.selectedTab = 'cropping';
		console.log('switch tabs');
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
}

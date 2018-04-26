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
export class CropImageModalComponent {
	@Output() cropperError: EventEmitter<string> = new EventEmitter<string>();
	protected allowImageTypes: string[] = [
		'image/jpg',
		'image/png',
		'image/gif'
	];
	public imageChangedEvent: any = '';
	public croppedImage: any = '';
	public files: FileList;

	constructor(private elem: ElementRef, private renderer: Renderer2) {}

	selectedFiles(files: FileList): void {
		console.log('CropImageModalComponent:', files);
		this.files = files;
	}

	selectedFilesEvent(event: any): void {
		console.log('CropImageModalComponent:', event);
		this.imageChangedEvent = event;
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

	protected loadFile(file: File): void {
		let fileReader: FileReader = new FileReader();
		fileReader.addEventListener('load', ($event: any) => {
			const type: string = $event.target.files[0].type;
			if (this.allowImageTypes.includes(type)) {
			} else {
				this.cropperError.emit('Image type not allowed.');
			}
		});
		fileReader.readAsDataURL(file);
	}
}

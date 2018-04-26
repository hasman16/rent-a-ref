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
import { ToastService } from './../toast/toast.service';
import { Toast } from './../toast';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'rar-image-cropper',
	templateUrl: './image-cropper.component.html',
	styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements AfterViewInit, OnInit, OnDestroy {
	@Input('image')
	set setImage(file: File) {
		console.log('file is:', file);
		if (file) {
			console.log('file:', file.name);
		}
	}

	private toastSubscription: Subscription;
	private cropperx: number = 0;
	private croppery: number = 0;

	constructor(
		private elem: ElementRef,
		private renderer: Renderer2,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	ngOnDestroy() {}

	ngAfterViewInit() {}

	uploadImages(images: FileList): void {
		console.log('=========>images:', images);
	}
}

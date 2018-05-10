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
import * as _ from 'lodash';

@Component({
	selector: 'rar-uploader',
	templateUrl: './uploader.component.html',
	styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild('uploader') uploadElement: ElementRef;

	@Input() multiple: boolean = false;
	@Output() selectedFiles: EventEmitter<FileList> = new EventEmitter();
	@Output() selectedFilesEvent: EventEmitter<any> = new EventEmitter();

	private toastSubscription: Subscription;
	public uploadLabel: string = 'Upload Image';
	private files: FileList = null;

	constructor(
		private elem: ElementRef,
		private renderer: Renderer2,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	ngOnDestroy() {}

	ngAfterViewInit() {
		this.setUp();
	}

	uploadedImages(images: FileList): void {
		console.log('uploadedImages:', images);
		this.files = images;
		this.selectedFiles.emit(images);
	}

	uploadedImagesEvent($event: any): void {
		this.selectedFilesEvent.emit($event);
	}

	dragEnter($event) {
		const nativeElement = this.uploadElement.nativeElement.parentNode;
		this.renderer.addClass(nativeElement, 'highlightDropZone');
	}

	dragDrop($event) {
		$event.stopPropagation();
		$event.preventDefault();
		const dt = $event.dataTransfer;
		const files = dt.files;
		this.files = files;
		$event.target.files = files;
		this.selectedFilesEvent.emit($event);
	}

	dragOver($event) {
		$event.preventDefault();
		const nativeElement = this.uploadElement.nativeElement.parentNode;
		this.renderer.addClass(nativeElement, 'highlightDropZone');
	}

	dragLeave($event) {
		const nativeElement = this.uploadElement.nativeElement.parentNode;
		this.renderer.removeClass(nativeElement, 'highlightDropZone');
	}

	cleanUp($event) {
		const nativeElement = this.uploadElement.nativeElement;
		nativeElement.removeEventListener(this.dragEnter);
		nativeElement.removeEventListener(this.dragOver);
		nativeElement.removeEventListener(this.dragDrop);
		nativeElement.removeEventListener(this.dragLeave);
	}

	setUp() {
		const nativeElement = this.uploadElement.nativeElement;
		nativeElement.addEventListener('dragenter', this.dragEnter.bind(this));
		nativeElement.addEventListener('drop', this.dragDrop.bind(this));
		nativeElement.addEventListener('dragover', this.dragOver.bind(this));
		nativeElement.addEventListener('dragleave', this.dragLeave.bind(this));
	}
}

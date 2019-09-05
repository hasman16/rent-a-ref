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
import { Subscription } from 'rxjs';

@Component({
	selector: 'rar-upload-button',
	templateUrl: './upload-button.component.html',
	styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild('someInput') boldElement: ElementRef;

	@Input() multiple: boolean = false;
	@Input() uploadLabel: string = 'Upload';
	@Output() selectedFiles: EventEmitter<FileList> = new EventEmitter();
	@Output() selectedFilesEvent: EventEmitter<any> = new EventEmitter();

	private uploadInput = null;
	private newNode: Node;

	private toastSubscription: Subscription;

	constructor(
		private elem: ElementRef,
		private renderer: Renderer2,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	ngOnDestroy() {}

	ngAfterViewInit() {
		this.addUploadElement();
	}

	public addUploadElement(): void {
		const parent = this.boldElement.nativeElement.parentNode;
		const boldElement = this.boldElement.nativeElement;

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
	}

	public uploadImages($event): void {
		const files: FileList = <FileList>$event.target.files;
		this.selectedFiles.emit(files);
		this.selectedFilesEvent.emit($event);
		this.addUploadElement();
	}
}

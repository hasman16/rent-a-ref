//https://github.com/Mawi137/ngx-image-cropper
import {
	Component,
	OnDestroy,
	OnInit,
	ElementRef,
	Renderer2,
	ChangeDetectorRef
} from '@angular/core';
import {
  OrganizeService
} from './../../services/index';
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
		private cropImageModalService: CropImageModalService,
    	private organizeService: OrganizeService
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

	public openModal($event): void {
		console.log('Modal Openned');
	}

	public submitModal($event): void {
		console.log('submitModal clicked:');
		const formData = new FormData();

		formData.append('photo', this.croppedImage);
		this.organizeService.uploadLogo(this.cropImageModalService.organization_id, formData)
		.subscribe(() => {
			console.log('it worked');
			},(err) => {
				console.log('it screwed up');
			});
	}

	public closeModal($event): void {
		console.log('Modal Closed');
	}
}

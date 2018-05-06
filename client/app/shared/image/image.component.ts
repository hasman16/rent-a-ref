import { Component, Input } from '@angular/core';

@Component({
	selector: 'rar-image',
	template: `
        <img [defaultImage]="defaultImage" [lazyLoad]="image" [offset]="offset" [errorImage]="errorImage" width="{{width}}" alt="{{alt}}">
    `,
	styleUrls: ['image.component.scss']
})
export class RaRImageComponent {
	@Input() defaultImage: string = '/assets/images/loader.gif';
	@Input() image: string = '';
	@Input() errorImage: string = '';
	@Input() offset: number = 100;
	@Input() width: number;
	@Input() alt: string = '';
	constructor() {}
}

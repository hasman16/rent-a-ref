import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnDestroy,
	OnInit
} from '@angular/core';

@Component({
	selector: 'rar-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
	@Input() placeholder: string = 'Search Box..';
	@Input() searchLabel: string = 'Search';
	@Output() searchEvent: EventEmitter<any> = new EventEmitter();
	@Output() searchText: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	ngOnDestroy() {}

	public updateSearchText(event): void {
		const value: string = event.target.value.toLowerCase();
		this.searchEvent.emit(event);
		this.searchText.emit(value);
	}
}

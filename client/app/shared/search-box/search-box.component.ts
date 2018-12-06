import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Option } from '../models/index';
import * as _ from 'lodash';

@Component({
	selector: 'rar-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
	@Input() placeholder: string = 'Search Box..';
	@Input() searchLabel: string = 'Search';
	@Input('search-attributes')
	set setSearchAttributes(searchAttributes: Array<Option>) {
		if (_.isArray(searchAttributes) && searchAttributes.length > 0) {
			this.searchAttributes = <Array<Option>>_(_.cloneDeep(searchAttributes))
				.map((item: Option) => {
					item.selected = false;
					return item;
				})
				.value();
			const selectedItem: Option = <Option>_.head(this.searchAttributes);
			selectedItem.selected = true;
		}
	}
	@Output() searchEvent: EventEmitter<any> = new EventEmitter();
	@Output() searchText: EventEmitter<string> = new EventEmitter();
	@Output() searchAttribute: EventEmitter<string> = new EventEmitter();
	public searchAttributes: Array<Option>;
	constructor() {}

	public updateSearchText(event): void {
		const value: string = event.target.value.toLowerCase();
		this.searchEvent.emit(event);
		this.searchText.emit(value);
	}

	public updateAttribute(event): void {
		this.searchAttribute.emit(event.value);
	}
}

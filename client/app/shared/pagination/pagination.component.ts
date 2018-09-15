import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Page, Option } from '../models/index';
import * as _ from 'lodash';

@Component({
	selector: 'rar-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
	@Input('page')
	set setSearchAttributes(page: Page) {
		if (page) {
			this.page = _.cloneDeep(page);
			if (this.page.limit > 0 && this.page.total_elements > 0) {
				this.currentPage = this.page.offset;
				this.lastPage = this.page.total_elements / this.page.limit;
			} else {
				this.currentPage = this.lastPage = 0;
			}
		}
	}
	@Output() next: EventEmitter<Page> = new EventEmitter();
	@Output() previous: EventEmitter<Page> = new EventEmitter();
	private page: Page;
	public currentPage: number = 0;
	public lastPage: number = 0;
	public limit: number = 0;
	public totalElements: number = 0;

	constructor() {}

	private calculatePage(proposedPage: number): Page {
		let page: Page = _.cloneDeep(this.page);
		page.offset = Math.max(Math.min(proposedPage, this.lastPage), 0);
		return page;
	}

	public nextPage(event): void {
		const page: Page = this.calculatePage(this.page.offset + 1);
		this.next.emit(page);
	}

	public previousPage(event): void {
		const page: Page = this.calculatePage(this.page.offset - 1);
		this.previous.emit(page);
	}
}

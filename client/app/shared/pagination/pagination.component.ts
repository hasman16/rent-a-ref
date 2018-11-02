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
	@Input('limit')
	set setLimit(limit: number) {
		this.limit = limit;
		this.setPagination();
	}
	@Input('count')
	set setCount(count: number) {
		this.totalElements = count;
		this.setPagination();
	}
	@Input('offset')
	set setOffset(offset: number) {
		this.offset = offset;
		this.setPagination();
	}
	@Output('page') newPage: EventEmitter<Page> = new EventEmitter();
	private page: Page;
	public currentPage: number = 0;
	public lastPage: number = 0;
	public totalElements: number = 0;
	public limit: number = 0;
	public offset: number = 0;

	constructor() {}

	private setValueInBounds(currentPage: number, lastPage: number): number {
		currentPage = currentPage < lastPage ? currentPage : lastPage - 1;
		return Math.max(currentPage, 0);
	}

	private setPagination(): void {
		if (
			_.isFinite(this.limit) &&
			_.isFinite(this.totalElements) &&
			_.isFinite(this.offset) &&
			this.totalElements > 0 &&
			this.limit > 0 &&
			this.totalElements > this.limit
		) {
			this.lastPage = Math.ceil(this.totalElements / this.limit);
			this.currentPage = this.offset + 1;
		} else {
			this.currentPage = this.lastPage = 0;
		}
	}

	private calculatePage(proposedPage: number): void {
		const page: Page = <Page>{};
		page.offset = this.setValueInBounds(proposedPage, this.lastPage);
		this.newPage.emit(page);
	}

	public nextPage(event): void {
		this.calculatePage(this.offset + 1);
	}

	public previousPage(event): void {
		this.calculatePage(this.offset - 1);
	}
}

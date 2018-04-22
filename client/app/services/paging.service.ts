import { Injectable } from '@angular/core';
import { Page, PagedData, Sorts } from './../shared/models/index';
import * as _ from 'lodash';

@Injectable()
export class PagingService {
	private LIMIT: number = 10;
	constructor() {}

	getDefaultPager(): Page {
		return <Page>{
			offset: 0,
			limit: this.LIMIT,
			total_elements: 0,
			total_pages: 0,
			sortby: '',
			order: '',
			search: ''
		};
	}

	sortColumn(page: Page, sorting): Page {
		const sort: Sorts = <Sorts>sorting.sorts[0];
		let pager: Page = _.cloneDeep(page);
		pager.order = sort.dir;
		pager.sortby = sort.prop;
		pager.offset = 0;
		return pager;
	}

	processPagedData(page: Page, data: PagedData): [Page, Array<any>] {
		const newData: any = _.isArray(data.rows) ? _.cloneDeep(data.rows) : [];
		let pager: Page = _.cloneDeep(page);
		pager.limit = Math.min(Math.max(pager.limit,0), this.LIMIT);
		pager.total_elements = data.count || 0;
		pager.total_pages = Math.ceil(pager.total_elements / pager.limit);

		return [pager, newData];
	}
}

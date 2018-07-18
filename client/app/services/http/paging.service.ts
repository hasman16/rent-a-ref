import { Injectable } from '@angular/core';
import { Page, PagedData, Sorts } from './../../shared/models/index';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';

@Injectable()
export class PagingService {
	private LIMIT: number = 10;
	constructor() {}

	public getDefaultPager(): Page {
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

	public search(page: Page, search): Page {
		let pager: Page = _.cloneDeep(page);
		pager.search = search;
		pager.offset = 0;
		return pager;
	}

	public sortColumn(page: Page, sorting): Page {
		const sort: Sorts = <Sorts>sorting.sorts[0];
		let pager: Page = _.cloneDeep(page);
		pager.order = sort.dir;
		pager.sortby = sort.prop;
		pager.offset = 0;
		return pager;
	}

	public processPagedData(page: Page, data: PagedData): [Page, Array<any>] {
		const newData: any = _.isArray(data.rows) ? _.cloneDeep(data.rows) : [];
		let pager: Page = _.cloneDeep(page);
		pager.limit = Math.min(Math.max(pager.limit, 0), this.LIMIT);
		pager.total_elements = data.count || 0;
		pager.total_pages = Math.ceil(pager.total_elements / pager.limit);

		return [pager, newData];
	}

	public formatDate(id, collection): string {
	    const item = _.find(collection, (item) => {
	      return id == item.id
	    });
	    let value: string = moment.tz(item.date, item.timezone_id).format('MMMM DD YYYY');
	    return value;
  	}

  	public isTimeLocked(eventObj, lock=1, grain='minutes'): boolean {
      const now = moment().utc();
      const matchTime = moment.tz(eventObj.date, eventObj.timezone_id);
      const lockTime = matchTime.utc().subtract(lock,'hour');

      return now.isSameOrBefore(lockTime, grain);
  	}
}

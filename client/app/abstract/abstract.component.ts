import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastComponent } from '../shared/toast/toast.component';
import { PagingService } from '../services/index';
import { Option, Page, PagedData, Sorts } from './../shared/models/index';
import { Observable, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import * as _ from 'lodash';

export abstract class AbstractComponent {
	protected isLoading: boolean = true;
	public page: Page;
	public selected: any[] = [];
	protected searchSubject: Subject<Page>;
	protected search$: Observable<Page>;
	protected searchAttribute: string;
	protected delay: number = 1000;
	protected subscriptions: Subscription[] = [];
	public searchAttributes: Array<Option>;

	constructor(protected pagingService: PagingService) {}

	protected initialize(): void {
		this.cleanUp();
		this.subscriptions = [];
		this.isLoading = false;
		this.page = _.cloneDeep(this.pagingService.getDefaultPager());
		this.searchSubject = new Subject();
		this.search$ = this.searchSubject.asObservable();
		this.subscriptions.push(
			this.search$
				.pipe(
					debounceTime(this.delay),
					tap((page: Page) => {
						this.getData(_.cloneDeep(page));
					})
				)
				.subscribe()
		);
	}

	protected cleanUp() {
		this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
	}

	public updateSearchTextFilter(event): void {
		const value: string = event.target.value.toLowerCase();
		const length: number = value.length;
		if (!this.isLoading) {
			const page: Page = this.pagingService.search(
				this.page,
				this.searchAttribute + value
			);
			this.page = _.cloneDeep(page);
			this.searchSubject.next(this.page);
		}
	}

	public updateSearchAttribute(event): void {}

	public onSortTableColumn(sorting): void {
		const page: Page = this.pagingService.sortColumn(this.page, sorting);
		this.page = _.cloneDeep(page);
		this.getData(this.page);
	}

	public onSelectTableRow({ selected }): void {}

	public onActivate(event): void {}

	public setPage(paging: Page): void {
		this.page.offset = paging.offset;
		this.getData(this.page);
	}

	protected extractDataAndPagedData(data: PagedData): any[] {
		const [page, newData] = this.pagingService.processPagedData(
			this.page,
			data
		);
		this.page = page;
		return newData;
	}

	protected abstract processPagedData(data: PagedData): void;
	protected abstract getData(data: Page): void;
}

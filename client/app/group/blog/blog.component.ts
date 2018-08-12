//import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AbstractComponent } from '../../abstract/abstract.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Page, PagedData, Sorts, User } from '../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

import {
	AuthService,
	CanComponentDeactivate,
	BlogService,
	PagingService,
	UserService
} from '../../services/index';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent extends AbstractComponent implements OnInit {
	//@Output() customElement = new EventEmitter<string>();
	parent = false;
	newLoadPage = 'loadBlog';
	public post: any[];
	//public blogging: any[];
	public isLoading: boolean = false;
	public placeholder: string = 'search Post';
	constructor(
		private cd: ChangeDetectorRef,
		private auth: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private toast: ToastComponent,
		private userService: UserService,
		private blogService: BlogService,
		protected pagingService: PagingService
	) {
		super(pagingService);
	}

	ngOnInit() {
		this.initialize();
		//this.customElement.emit('loadPost');
		console.log('data: ' + this.route.snapshot.data);
		this.searchAttribute = 'blog_name|';
		const pagedData: PagedData = this.route.snapshot.data.blogData;
		this.processPagedData(pagedData);
	}

	public onSelectTableRow({ selected }): void {
		const postBlog = _.cloneDeep(_.head(selected));
	}

	public getBlog(params: Page) {
		console.log('Initial load');
		this.parent = false;
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		let page: Page = _.cloneDeep(params);
		this.isLoading = true;
		this.blogService
			.getUserPost(user_id, page)
			.subscribe(
				res => this.callSuccess(res),
				(err: HttpErrorResponse) => this.callFailure(err)
			);
	}

	protected callSuccess(data: PagedData) {
		this.processPagedData(data);
		this.toast.setMessage('Blog data retrieved', 'success');
		this.isLoading = false;
		this.cd.markForCheck();
	}

	protected callFailure(
		err: HttpErrorResponse,
		message = 'An error occurred when fetching the blog data'
	) {
		if (err.error instanceof Error) {
			this.toast.setMessage(message, 'danger');
		} else {
			this.toast.setMessage(
				'An error occurred:' + err.statusText,
				'danger'
			);
		}
		this.isLoading = false;
		this.cd.markForCheck();
	}

	protected processPagedData(data: PagedData): void {
		this.post = this.extractDataAndPagedData(data);
	}

	protected getData(data: Page): void {
		this.getBlog(data);
	}

	public goNewBlog() {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;
		console.log('ID 1: ' + user_id);
		//this.customElement.emit('createPost');
		this.parent = true;
		this.router.navigate(['blog/create-post']);
	}

	public onLoadPage(receivedEvent) {
		if (receivedEvent == 'createBlog') {
			this.parent = true;
		} else {
			this.parent = false;
		}
		this.newLoadPage = receivedEvent;
		console.log('this.newLoadPage: ' + this.newLoadPage);
	}
}

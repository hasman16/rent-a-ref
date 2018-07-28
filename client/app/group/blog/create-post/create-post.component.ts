import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	EventEmitter, Input, Output
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AbstractComponent } from '../../../abstract/abstract.component';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { Page, PagedData, Sorts, User } from '../../../shared/models/index';
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
} from '../../../services/index';

@Component({
	selector: 'app-createblog',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent extends AbstractComponent implements OnInit {
	@Output() loadPage = new EventEmitter<string>();
	public form: FormGroup = new FormGroup({});
	public model: any = {};
	public options: FormlyFormOptions = {};
	public fields: FormlyFieldConfig[];
	public post: any[];
	public isLoading: boolean = false;
	public placeholder: string = 'search Post';
	constructor(
		private cd: ChangeDetectorRef,
		private auth: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		public toast: ToastComponent,
		private userService: UserService,
		private blogService: BlogService,
		protected pagingService: PagingService
	) {
		super(pagingService);
	}

	ngOnInit() {
		this.loadPage.emit('createBlog');
		console.log('loadPage: ' + this.loadPage);
		this.initialize();
		this.fields = [
			{
			  key: 'fullname',
			  type: 'input',
			  templateOptions: {
			    placeholder: 'Fullname',
			    label: 'Fullname',
			    required: true,
			    minLength: 5
			  }
			},
			{
			  key: 'email',
			  type: 'input',
			  templateOptions: {
			    type: 'email',
			    placeholder: 'Email Address',
			    label: 'Email',
			    required: true,
			    minLength: 5
			  }
			},
			{
			  key: 'subject',
			  type: 'input',
			  templateOptions: {
			    placeholder: 'Subject',
			    label: 'Subject',
			    required: true,
			    minLength: 5
			  }
			},
			{
			  key: 'comment',
			  type: 'textarea',
			  templateOptions: {
			    type: 'textarea',
			    placeholder: 'Comment',
			    label: 'Comment',
			    required: true,
			    minLength: 5
			  }
			}
		            ];
		/*this.searchAttribute = 'blog_name|';
		const pagedData: PagedData = this.route.snapshot.data.blogData;
		this.processPagedData(pagedData);*/
	}

	public onSelect({ selected }): void {
		const postBlog = _.cloneDeep(_.head(selected));
	}

	public setPage(paging): void {
		this.page.offset = paging.offset;
		this.getBlog(this.page);
	}

	public getBlog(params: Page) {
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
		this.post = this.extraPagedData(data);
	}

	protected getData(data: Page): void {
		this.getBlog(data);
	}

	onSubmit(model) {}

	onCancel(){
	  this.loadPage.emit('loadBlog');
	  console.log('loadPage 1: ' + this.loadPage);
	  this.router.navigate(['blog']);
	}
}

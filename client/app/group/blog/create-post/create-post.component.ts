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
import { Page, PagedData, Sorts, User, Post } from '../../../shared/models/index';
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
export class CreatePostComponent implements OnInit {
	@Output() loadPage = new EventEmitter<string>();
	parent = false;
	public form: FormGroup = new FormGroup({});
	public model: any = {};
	public options: FormlyFormOptions = {};
	public fields: FormlyFieldConfig[];
	public post: Post;
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
		
	}

	ngOnInit() {
		this.loadPage.emit('createBlog');
		console.log('loadPage: ' + this.loadPage);
		
		this.fields = [
			{
			  key: 'blog-title',
			  type: 'input',
			  templateOptions: {
			    placeholder: 'Title',
			    label: 'Blog Title',
			    required: true,
			    minLength: 5
			  }
			},
			{
			  key: 'blog-category',
			  type: 'input',
			  templateOptions: {
			    type: 'input',
			    placeholder: 'Blog Category',
			    label: 'Category',
			    required: true,
			    minLength: 3
			  }
			},
			{
			  key: 'reference',
			  type: 'input',
			  templateOptions: {
			    placeholder: 'Reference',
			    label: 'Reference',
			    required: true,
			    minLength: 5
			  }
			},
			{
			  key: 'content',
			  type: 'textarea',
			  templateOptions: {
			    type: 'textarea',
			    placeholder: 'Blog Text',
			    label: 'Blog Text',
			    required: true,
			    minLength: 5
			  }
			}
		            ];
	
	}


	public createBlog(post: Post) {
		const currentUser: User = this.auth.getCurrentUser();
		const user_id = currentUser.id;		
		this.isLoading = true;
		this.blogService
			.createPost(post)
			.subscribe(
				res => {
					this.toast.setMessage('Post Successfully Created', 'success');
					this.parent = true;
					this.router.navigate(['blog']);
					//this.router.navigate(['/login']);
				},
				(err: HttpErrorResponse) => {
					if (err.error instanceof Error) {
						this.toast.setMessage('Oops! Something is wrong: Post not created', 'danger');
					} else {
						this.toast.setMessage(
							'An error occurred while creating the post.',
							'danger'
						);
					}
				}
			);
	}


	onSubmit(model) {}

	onCancel(){
	  this.loadPage.emit('loadBlog');
	  console.log('loadPage 1: ' + this.loadPage);
	  this.router.navigate(['blog']);
	}
}

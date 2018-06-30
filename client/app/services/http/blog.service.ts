import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  BaseModel,
  Comment,
  Post,
  PagedData
} from './../../shared/models/index';

import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class BlogService extends AbstractService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public getAllPosts(queryParams: any = null): Observable<PagedData> {
    return <Observable<PagedData>>this.http.get(`/api/posts`, {
      params: queryParams
    });
  }

  public getPost(post_id: string): Observable<Post> {
    return this.http.get<Post>(`/api/posts/${post_id}`);
  }

  public getUserPost(
    post_id: string,
    queryParams: any = null
  ): Observable<PagedData> {
    const url = `/api/users/${post_id}/posts`;
    console.log('url is;', url, queryParams);
    return this.http.get<PagedData>(url, {
      params: queryParams
    });
  }

  public createPost(post: Post): Observable<Post> {
    const url = `/api/posts`;
    return this.postData(url, post);
  }

  public updatePost(post): Observable<Post> {
    const url: string = `/api/posts/${post.id}`;
    return this.putData(url, post);
  }

  public createComment(post_id: string, comment: Comment): Observable<Comment> {
    const url: string = `/api/posts/${post_id}/comment`;
    return this.postData(url, comment);
  }

  public updateComment(post_id: string, comment: Comment): Observable<Comment> {
    const url: string = `/api/posts/${post_id}/comment/${comment.id}`;
    return this.putData(url, comment);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/request/comment.model';
import { Like } from '../models/request/like.model';
import { Post } from '../models/request/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  post(body: FormData): Observable<Post> {
    return this.http.post<Post>(`${environment.api_url}posts-ms/api/posts`, body);
  }

  getAllById(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api_url}posts-ms/api/posts/users/${id}`);
  }

  getAllByIds(ids: number[]) {
    return this.http.post<Post[]>(`${environment.api_url}posts-ms/api/posts/users`, {
      userIds: ids
    });
  }

  createLike(like: Like): Observable<Like> {
    return this.http.post<Like>(`${environment.api_url}posts-ms/api/likes`, like);
  }

  removeLike(userId: number, postId: number) {
    return this.http.delete(`${environment.api_url}posts-ms/api/likes/users/${userId}/posts/${postId}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${environment.api_url}posts-ms/api/comments`, comment);
  }

}

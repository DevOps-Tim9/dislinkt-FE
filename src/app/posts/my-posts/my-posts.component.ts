import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/request/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) {
    this.postService.getAllById(1).subscribe((res) => this.posts = res);
  }

  ngOnInit(): void {
  }

}

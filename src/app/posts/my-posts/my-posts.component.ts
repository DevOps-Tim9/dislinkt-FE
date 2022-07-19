import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/request/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  posts: Post[] = [];

  userId: number;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {
    this.userService.getByEmail(localStorage['mail']).subscribe(res => {
      this.userId = res['ID'];

      this.postService.getAllById(this.userId).subscribe((res) => this.posts = res);
    });
  }

  ngOnInit(): void {
  }

}

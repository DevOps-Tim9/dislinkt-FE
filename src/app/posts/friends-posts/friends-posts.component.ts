import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/request/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-friends-posts',
  templateUrl: './friends-posts.component.html',
  styleUrls: ['./friends-posts.component.scss']
})
export class FriendsPostsComponent implements OnInit {

  posts: Post[] = [];

  userId = 7;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.userService.getFollowing(this.userId).subscribe(followers => this.postService.getAllByIds(followers.map(item => item.following_id)).subscribe((res) => this.posts = res));
  }

  ngOnInit(): void {
  }

}

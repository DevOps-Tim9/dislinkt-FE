import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/core/models/request/image.model';
import { Post } from 'src/app/core/models/request/post.model';
import { ImageService } from 'src/app/core/services/image.service';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  image: Image;

  user: any;

  api_url = environment.api_url;

  userId = 1;

  comment: string = "";

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.imageService.getById(this.post?.imageId).subscribe(res => this.image = res);
    this.userService.getById(this.post?.userId).subscribe(res => this.user = res);
  }

  isClickedLike(): boolean {
    return this.post.likes.find(like => like.userId == this.userId && like.likeType == 1) != undefined;
  }

  isClickedUnlike(): boolean {
    return this.post.likes.find(like => like.userId == this.userId && like.likeType == 2) != undefined;
  }

  pressedLike(): void {
    if (this.isClickedLike()) {
      this.postService.removeLike(this.userId, this.post.id).subscribe((res) => {
        this.post.totalLikes = this.post.totalLikes - 1;
        this.post.likes.splice(this.post.likes.findIndex(like => like.userId == this.userId && like.likeType == 1), 1);
      });
    }
    else {
      this.postService.createLike({ id: null, likeType: 1, userId: this.userId, postId: this.post.id })
        .subscribe((res) => {
          this.post.totalLikes = this.post.totalLikes + 1;
          this.post.likes.push(res);
        });
    }
  }

  pressedUnlike(): void {
    if (this.isClickedUnlike()) {
      this.postService.removeLike(this.userId, this.post.id).subscribe(
        () => {
          this.post.totalUnlikes = this.post.totalUnlikes - 1;
          this.post.likes.splice(this.post.likes.findIndex(like => like.userId == this.userId && like.likeType == 2), 1);
        });
    }
    else {
      this.postService.createLike({ id: null, likeType: 2, userId: this.userId, postId: this.post.id })
        .subscribe((res) => {
          this.post.totalUnlikes = this.post.totalUnlikes + 1;
          this.post.likes.push(res);
        });
    }
  }

  createComment() {
    if (this.comment.trim().length)
      this.postService.createComment({ id: null, content: this.comment, postId: this.post.id, userId: this.userId }).subscribe((res) => {
        this.post.comments.push(res);
        this.comment = "";
      });
  }

}

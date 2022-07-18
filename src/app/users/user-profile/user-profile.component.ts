import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/models/request/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: Post[];

  userId: number;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.postService.getAllById(this.userId).subscribe((res) => this.posts = res);
    });
  }

}

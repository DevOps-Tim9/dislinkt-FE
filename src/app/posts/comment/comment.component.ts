import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/request/comment.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.comment?.userId).subscribe(res => this.user = res);
  }

}

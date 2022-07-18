import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from 'src/app/core/models/request/post.model';
import {PostService} from 'src/app/core/services/post.service';
import {UserService} from "../../core/services/user.service";
import {FollowingService} from "../../core/services/following.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: Post[];
  user;
  loggedInUser;
  userId: number;
  buttonDescription = 'Follow';
  buttonDisable = false;
  request = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private followingService: FollowingService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.buttonDescription = 'Follow';
      this.buttonDisable = false;
      this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
      this.userService.getById(this.userId).subscribe(data => {
        this.user = data;
      })
      this.userService.getByEmail(localStorage['mail']).subscribe(
        data => {
          this.loggedInUser = data
          if (data['ID'] == this.userId) {
            this.buttonDescription = "Your profile"
            this.buttonDisable = true;
            this.setUpPosts(this.userId)
          } else {
            this.userService.getFollowers(this.userId).subscribe(data => {
                data.filter(following => {
                  if (following['followers_id'] == this.loggedInUser['ID']) {
                    this.buttonDescription = "Following"
                    this.buttonDisable = false;
                    this.setUpPosts(this.userId)
                  }
                })
              }
            );
            this.userService.getRequests(this.userId).subscribe(data => {
                data.filter(following => {
                  if (following['followers_id'] == this.loggedInUser['ID']) {
                    this.buttonDescription = "Request"
                    this.request = data[0];
                    this.buttonDisable = false;
                  }
                })
              }
            );
          }
        }
      )
    });
  }

  onClickFollowButton() {
    switch (this.buttonDescription) {
      case "Follow": {
        if (this.user.Public) {

          this.followingService.pushFollow(this.loggedInUser['ID'], this.userId).subscribe(
            data => {
              this.setUpPosts(this.userId)
              this.buttonDescription = "Following"
              alert("The follow has been sent")
            }
          )

        } else {
          this.buttonDescription = "Request"
          this.followingService.pushRequest(this.loggedInUser['ID'], this.userId).subscribe(
            data => {
              this.buttonDescription = "Request"
              this.request = {
                id: data,
                followers_id: this.loggedInUser['ID'],
                following_id: this.userId

              }
              alert("The request has been sent")
            }
          )
        }
        break
      }
      case "Request": {
        this.buttonDescription = "Follow"
        this.followingService.changeRequest(this.request.id, this.request['followers_id'], this.request['following_id'], 2).subscribe(
          data => {
            alert("Removed following request")
          }
        )
        break;
      }
      case "Following": {
        this.followingService.pushUnfollow(this.loggedInUser['ID'], this.userId).subscribe(
          data => {
            this.posts = []
            this.buttonDescription = "Follow"
            alert("Successfully unfollowed")

          }
        )
        break;
      }
    }
  }

  setUpPosts(userId) {
    this.postService.getAllById(userId).subscribe((res) => this.posts = res);
  }
}

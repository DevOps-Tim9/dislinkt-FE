import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../core/services/user.service";
import {AuthService} from "../core/services/auth.service";
import {skipWhile, take, timeout} from "rxjs/operators";
import {FollowerModel} from "../core/models/request/follower.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FollowingService} from "../core/services/following.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})

export class FollowingComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  followingUsers= []
  displayedColumns:  string[] = ['name','username', 'email', 'follow']
  mainUserID = -1;
  constructor(
    private userService: UserService,
    private followingService: FollowingService
  ) { }


  ngOnInit(): void {
    this.userService.getByEmail(localStorage['mail']).subscribe(
      user => {
        console.log(user)
        this.mainUserID = user['ID'];
        this.userService.getFollowing(user['ID']).subscribe(
          following => {
            this.findFollowers(following);
          }
        );
      }
    )
  }


  findFollowers(following){
    following.forEach(following =>{
      this.userService.getById(following['following_id']).subscribe(
        user => {
          this.followingUsers.push(user)
          this.dataSource = new MatTableDataSource(this.followingUsers)
        }
      )
    });
  }

  convertStatus(element){
    if(element.FollowingStatus == undefined || element.FollowingStatus == 'Following' || element.FollowingStatus == 'Request'){
      element.FollowingStatus = 'Unfollow'
      this.followingService.pushUnfollow(this.mainUserID, element.ID).subscribe(
        data => {
          alert("successfully unfollowed user" + element.FirstName + " " + element.LastName)
        }
      )
    }
    else{
      element.FollowingStatus = element.Public ? 'Following': 'Request'
      if( element.Public)
      this.followingService.pushFollow(this.mainUserID, element.ID).subscribe(
        data => {
          element.FollowingStatus = 'Following';
          alert("successfully followed user" + element.FirstName + " " + element.LastName)
        }
      )
      else{
        this.followingService.pushRequest(this.mainUserID, element.ID).subscribe(
          data => {
            element.FollowingStatus = 'Request';
            alert("successfully send request for following user" + element.FirstName + " " + element.LastName)
          }
        )
      }
    }
  }

  onClick(){
    this.dataSource = new MatTableDataSource(this.followingUsers)
    console.log(this.followingUsers)
  }

  onClickFollowBtn(element){
    this.followingUsers.filter(user => {
      if(user.ID == element.ID) {
        this.convertStatus(user)
      }
    })
  }

}

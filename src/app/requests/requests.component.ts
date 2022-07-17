import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../core/services/user.service";
import {FollowingService} from "../core/services/following.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  followers= []
  mainUserId = -1;
  displayedColumns:  string[] = ['name','username', 'email', 'approve']
  constructor(
    private userService: UserService,
    private followingService: FollowingService
  ) { }


  ngOnInit(): void {
    this.userService.getByEmail(localStorage['mail']).subscribe(
      user => {
        console.log(user)
        this.mainUserId = user['ID']
        this.userService.getRequests(user['ID']).subscribe(
          following => {
            this.findFollowers(following);
          }
        );
      }
    )
  }

  findFollowers(following){
    following.forEach(following =>{
      console.log(following)
      this.userService.getById(following['followers_id']).subscribe(
        user => {
          user.RequestStatus = following['request_status']
          user.RequestId = following['id']
          this.followers.push(user)
          this.dataSource = new MatTableDataSource(this.followers)
        }
      )
    });
  }

  onClickApproveBtn(element){
    this.followers.filter(user => {
      if(user.ID == element.ID){
        this.changeRequest(user,1)
      }
    })
  }

  onClickRefuseBtn(element){
    this.followers.filter(user => {
      if(user.ID == element.ID){
        this.changeRequest(user,2)
      }
    })
  }

  changeRequest(user, status){
    this.followingService.changeRequest(user.RequestId, user.ID, this.mainUserId, status).subscribe(
      date=>{
        user.RequestStatus = status;
        alert("Request successfully " + (status==1?"accepted":"rejected"))
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  followers= []
  displayedColumns:  string[] = ['name','username', 'email']
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getByEmail(localStorage['mail']).subscribe(
      user => {
        console.log(user)
        this.userService.getFollowers(user['ID']).subscribe(
          following => {
            this.findFollowers(following);
          }
        );
      }
    )
  }

  findFollowers(following){
    following.forEach(following =>{
      this.userService.getById(following['followers_id']).subscribe(
        user => {
          this.followers.push(user)
          this.dataSource = new MatTableDataSource(this.followers)
        }
      )
    });
  }

  onCLick(user){
    this.router.navigateByUrl(`/users/${user.ID}`);
  }

}

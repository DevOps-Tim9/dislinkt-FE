import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchValue: string = "";

  showSearchedUsers = false;

  searchedUsers: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  searchUsers(searchValue: string) {
    this.searchValue = searchValue;

    this.userService.getByUsername(searchValue).subscribe(res => this.searchedUsers = res);
  }

  selectedUser(user: any) {
    this.searchValue = "";

    this.searchedUsers = [];

    this.router.navigateByUrl(`/users/${user.ID}`);
  }

}

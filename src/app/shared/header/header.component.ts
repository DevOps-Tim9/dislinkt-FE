import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UserService } from 'src/app/core/services/user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notifications = [];

  searchValue: string = "";

  showSearchedUsers = false;

  searchedUsers: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) {
    interval(3000).subscribe((x =>{
      this.getNotifications();
    }));
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res: any) => {
      this.notifications = res;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
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

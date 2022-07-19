import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { NotificationsService } from '../core/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications = [];

  constructor(
    private notificationService: NotificationsService
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

  clear() {
    this.notificationService.deleteNotifications().subscribe(() => {
      this.notifications = [];
    });
  }

}

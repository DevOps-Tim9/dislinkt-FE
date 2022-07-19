import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../core/error-matchers/ErrorStateMatcher';
import { UserService } from '../core/services/user.service';
import { Snackbar } from '../shared/snackbar/snackbar';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {
  notificationsForm: FormGroup;
  submitted = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  currentSettings = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: Snackbar,
  ) {
    this.notificationsForm = this.formBuilder.group({
      messageNotifications: [false],
      followNotifications: [false],
      likeNotifications: [false],
      commentNotifications: [false],
    });
  }

  ngOnInit(): void {
    this.userService.getNotificationSettings().subscribe((res: any) => {
      this.currentSettings = res;
      this.notificationsForm.controls['messageNotifications'].setValue(res.MessageNotifications);
      this.notificationsForm.controls['followNotifications'].setValue(res.FollowNotifications);
      this.notificationsForm.controls['likeNotifications'].setValue(res.LikeNotifications);
      this.notificationsForm.controls['commentNotifications'].setValue(res.CommentNotifications);
    })
  }

  onChangeMessage(event) {
    this.notificationsForm.controls['messageNotifications'].setValue(event.checked);
  }

  onChangeFollow(event) {
    this.notificationsForm.controls['followNotifications'].setValue(event.checked);
  }

  onChangeLike(event) {
    this.notificationsForm.controls['likeNotifications'].setValue(event.checked);
  }

  onChangeComment(event) {
    this.notificationsForm.controls['commentNotifications'].setValue(event.checked);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.notificationsForm.invalid) {
      return;
    }
    const newSettings = { MessageNotifications: false, FollowNotifications: false, LikeNotifications: false, CommentNotifications: false };
    newSettings.MessageNotifications = this.notificationsForm.value.messageNotifications;
    newSettings.FollowNotifications = this.notificationsForm.value.followNotifications;
    newSettings.LikeNotifications = this.notificationsForm.value.likeNotifications;
    newSettings.CommentNotifications = this.notificationsForm.value.commentNotifications;

    this.userService.setNotifications(newSettings).subscribe((res: any) => {
      this.snackBar.success('Notification settings successfully updated.')
    },
    error => {
      console.log(error.error);
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.notificationsForm.controls; }

}

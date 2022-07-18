import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ChatsComponent } from './chat/chats/chats.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { FriendsPostsComponent } from './posts/friends-posts/friends-posts.component';
import { MyPostsComponent } from './posts/my-posts/my-posts.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import {FollowingComponent} from "./following/following.component";
import {FollowersComponent} from "./followers/followers.component";
import {RequestsComponent} from "./requests/requests.component";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: CallbackComponent,
  },
  {
    path: 'certificates',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'posts-create',
    component: CreatePostComponent,
  },
  {
    path: 'posts-my',
    component: MyPostsComponent,
  },
  {
    path: 'home',
    component: FriendsPostsComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'notification-settings',
    component: NotificationSettingsComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'following',
    component: FollowingComponent,
  },
  {
    path: 'followers',
    component: FollowersComponent,
  },
  {
    path: 'requests',
    component: RequestsComponent,
  },
  {
    path: 'chat',
    component: ChatsComponent,
  },
  {
    path: 'users/:id',
    component: UserProfileComponent,
  },
  {
    path: '**',
    component: CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

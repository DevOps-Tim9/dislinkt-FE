import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ChatsComponent } from './chat/chats/chats.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { FriendsPostsComponent } from './posts/friends-posts/friends-posts.component';
import { MyPostsComponent } from './posts/my-posts/my-posts.component';
import { RegisterComponent } from './register/register.component';

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
    path: 'chat',
    component: ChatsComponent,
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { MyPostsComponent } from './posts/my-posts/my-posts.component';
import { PostComponent } from './posts/post/post.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './posts/comment/comment.component';
import { FriendsPostsComponent } from './posts/friends-posts/friends-posts.component';
import { ChatsComponent } from './chat/chats/chats.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ConversationsComponent } from './chat/conversations/conversations.component';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { RequestsComponent } from './requests/requests.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MyProfileComponent } from './my-profile/my-profile.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EventsComponent } from './events/events.component';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomepageComponent,
    RegisterComponent,
    CreatePostComponent,
    MyPostsComponent,
    PostComponent,
    CommentComponent,
    FriendsPostsComponent,
    ChatsComponent,
    ChatComponent,
    ConversationsComponent,
    ConversationComponent,
    UserProfileComponent,
    FollowingComponent,
    FollowersComponent,
    RequestsComponent,
    MyProfileComponent,
    NotificationSettingsComponent,
    NotificationsComponent,
    EventsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        CoreModule,
        SharedModule,
        FormsModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatListModule,
        MatBadgeModule,
        MatSortModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

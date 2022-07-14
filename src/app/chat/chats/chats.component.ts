import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/core/models/request/conversation.model';
import { ConversationService } from 'src/app/core/services/conversation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  conversations: Conversation[] = [];

  userId = 7;

  chat: Conversation = null;

  searchValue: string = "";

  following: any[] = [];

  users: any[] = [];

  searchedUsers: any[] = [];

  showSearchedUsers = false;

  constructor(
    private conversationService: ConversationService,
    private userService: UserService
  ) {
    this.conversationService.getConversations(this.userId).subscribe(res => this.conversations = res);
    this.userService.getFollowing(this.userId).subscribe(res => {
      this.following = res;
      this.following.forEach(item => this.getUser(item));
    });
  }

  ngOnInit(): void {
  }

  getUser(following: any) {
    this.userService.getById(following.following_id).subscribe(res => this.users.push(res));
  }

  selectChat(chat: Conversation) {
    this.chat = chat;
  }

  searchUsers(searchValue) {
    this.searchValue = searchValue;

    if (this.searchValue === "") {
      this.searchedUsers = this.users;

      return;
    }

    this.searchedUsers = this.users.filter(item => { return item.Username.toLowerCase().includes(this.searchValue.toLowerCase()); });
  }

  selectedUser(user: any) {
    const existConversation: Conversation = this.conversations.find(conversation => (conversation.User1 == user.ID && conversation.User2 == this.userId) || (conversation.User2 == user.ID && conversation.User1 == this.userId));

    if (existConversation) {
      this.chat = existConversation;

      return
    }

    this.chat = { ID: null, LastMessage: null, User1: this.userId, User2: user.ID };
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from 'src/app/core/models/request/conversation.model';
import { Message } from 'src/app/core/models/request/message.model';
import { ConversationService } from 'src/app/core/services/conversation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input()
  chat: Conversation

  userId: number;

  participant: any;

  messages: Message[] = [];

  messageText: string;

  constructor(
    private userService: UserService,
    private conversationService: ConversationService
  ) {
  }

  ngOnInit(): void {
    debugger;
    this.userService.getByEmail(localStorage['mail']).subscribe(res => {
      this.userId = res['ID'];

      this.userService.getById(this.chat?.User1 == this.userId ? this.chat?.User2 : this.chat?.User1).subscribe(res => this.participant = res);
    });
    this.conversationService.getMessages(this.chat?.ID).subscribe(res => this.messages = res);
  }

  createMessage() {
    const message: Message = { ID: null, from: this.userId, to: this.chat.User1 == this.userId ? this.chat.User2 : this.chat.User1, text: this.messageText, createdAt: null };

    this.conversationService.sendMessage(message).subscribe(res => {
      this.messages.unshift(res);
      this.chat.LastMessage = res;
      this.messageText = "";
    });
  }

}

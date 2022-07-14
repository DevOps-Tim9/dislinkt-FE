import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/core/models/request/conversation.model';
import { ConversationService } from 'src/app/core/services/conversation.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  conversations: Conversation[] = [];

  userId = 4;

  chat: Conversation = null;

  constructor(private conversationService: ConversationService) {
    this.conversationService.getConversations(this.userId).subscribe(res => this.conversations = res);
  }

  ngOnInit(): void {
  }

  selectChat(chat: Conversation) {
    this.chat = chat;
  }
  
}

import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from 'src/app/core/models/request/conversation.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  @Input()
  conversation: Conversation;

  sender: any;

  userId = 4;

  participantInConversation: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getById(this.conversation?.LastMessage.from).subscribe(res => {
      this.sender = res;

      if (this.conversation.LastMessage.from == this.userId) {
        this.userService.getById(this.conversation.LastMessage.to).subscribe(user => this.participantInConversation = user);
      }
      else {
        this.participantInConversation = res;
      }
    });
  }

}

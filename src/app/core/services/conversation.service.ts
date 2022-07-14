import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation } from '../models/request/conversation.model';
import { Message } from '../models/request/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private http: HttpClient
  ) { }

  getConversations(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.api_url}messages-ms/api/messages/users/${userId}`);
  }

  getMessages(conversation: string) {
    return this.http.get<Message[]>(`${environment.api_url}messages-ms/api/messages/conversations/${conversation}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${environment.api_url}messages-ms/api/messages`, message);
  }

}

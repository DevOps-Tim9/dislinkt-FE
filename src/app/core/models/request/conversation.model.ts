import { Message } from "./message.model";

export interface Conversation {
    ID: string;
    User1: number;
    User2: number;
    LastMessage: Message;
}
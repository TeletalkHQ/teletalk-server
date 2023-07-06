import { CreatedAt, Id } from ".";

export type SenderId = Id;

export interface Sender {
  senderId: SenderId;
}

export type MessageText = string;

export type MessageId = Id;

export type ParticipantId = Id;
export type ChatId = Id;

export interface MessageItem {
  createdAt: CreatedAt;
  messageText: MessageText;
  messageId: MessageId;
  sender: Sender;
}

export type Messages = MessageItem[];

export interface ParticipantItem {
  participantId: ParticipantId;
}
export type Participants = ParticipantItem[];

export interface PrivateChatItem {
  chatId: ChatId;
  createdAt: CreatedAt;
  messages: Messages;
  participants: Participants;
}

export type PrivateChats = PrivateChatItem[];

import { Role } from './constants';

export interface IChat {
  id: number;
  title: string | null;
  updatedAt: string | null;
}

export interface IAttachment {
  downloadUrl: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

export interface IMessage {
  id: number;
  content: string;
  role: Role;
  audioFileUrl: string | null;
  voiceTranscript: string | null;
  attachments: IAttachment[];
}

export interface ISendMessageRequest {
  text?: string;
  audioFileUrl?: string;
  attachments?: IAttachment[];
}

export interface IGetChatsApiResponse {
  userId: number;
  userChatDtos: {
    chatId: number;
    title: string | null;
    updatedAt: string | null;
  }[];
}

export interface ICreateChatApiResponse {
  chatId: number;
}

export interface IGetChatMessagesApiResponse {
  chatId: number;
  title: string;
  messages: IMessage[];
}

export interface IGetChatMessagesTransformedResponse {
  title: string;
  messages: IMessage[];
}

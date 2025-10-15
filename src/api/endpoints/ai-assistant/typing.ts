export interface IChat {
  id: number;
  title: string | null;
  updatedAt: string | null;
}

export enum Role {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export interface IMessage {
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

export interface IAttachment {
  downloadUrl: string;
  originalFilename: string;
  contentType: string;
  size: number;
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

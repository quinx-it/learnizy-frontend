export interface IChat {
  id: number;
  title: string | null;
  updatedAt: string | null;
}

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ISendMessageRequest {
  text: string;
  audioFileUrl: string;
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

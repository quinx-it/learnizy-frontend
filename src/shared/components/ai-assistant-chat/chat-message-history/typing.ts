export interface IChatMessageHistoryProps {
  messages: IMessage[];
  isLoading?: boolean;
  isWaitingForAssistant?: boolean;
}
export enum Role {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export interface IMessage {
  role: Role;
  content: string;
  audioFileUrl?: string | null;
  voiceTranscript?: string | null;
  attachments?: IAttachment[];
}

export interface IAttachment {
  downloadUrl: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

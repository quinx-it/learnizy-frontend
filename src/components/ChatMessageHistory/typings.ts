import type { Role } from './const';

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

export interface IChatMessageHistoryProps {
  messages: IMessage[];
  isLoading?: boolean;
  isWaitingForAssistant?: boolean;
}

export interface IChatInputProps {
  onSendMessage: (data: ISendMessageRequest) => void;
  isLoading?: boolean;
  onStopResponse?: () => void;
  isWaitingResponse?: boolean;
}

export interface IAttachment {
  downloadUrl: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

export interface ISendMessageRequest {
  text?: string;
  audioFileUrl?: string;
  attachments?: IAttachment[];
}

export interface ILocalFile {
  id: string;
  file: File;
}

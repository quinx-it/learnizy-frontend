export interface IChatMessageHistoryProps {
  messages: IMessage[];
  isLoading?: boolean;
}

export interface IMessage {
  role: 'USER' | 'ASSISTANT';
  content: string;
}

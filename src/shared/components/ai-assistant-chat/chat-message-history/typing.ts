export interface IChatMessageHistoryProps {
  messages: IMessage[];
  isLoading?: boolean;
}

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
}

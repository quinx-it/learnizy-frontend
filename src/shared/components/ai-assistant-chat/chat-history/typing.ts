export interface IChatHistoryProps {
  selectedChatId: number | null;
  onSelectChat: (chatId: number) => void;
  onCreateChat: () => void;
}

import { type LucideIcon } from 'lucide-react';

export type ChatSuggestionType = {
  id: string;
  labelKey: string;
  promptKey: string;
  Icon: LucideIcon;
};

export interface IChatSuggestionsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

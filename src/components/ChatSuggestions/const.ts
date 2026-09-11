import { BookOpen, Bug, CalendarCheck, MessageCircleQuestion } from 'lucide-react';

import { type ChatSuggestionType } from './typings';

export const CHAT_SUGGESTIONS: ChatSuggestionType[] = [
  {
    id: 'explain',
    labelKey: 'CHAT.SUGGESTIONS.EXPLAIN_LABEL',
    promptKey: 'CHAT.SUGGESTIONS.EXPLAIN_PROMPT',
    Icon: BookOpen,
  },
  {
    id: 'mistake',
    labelKey: 'CHAT.SUGGESTIONS.MISTAKE_LABEL',
    promptKey: 'CHAT.SUGGESTIONS.MISTAKE_PROMPT',
    Icon: Bug,
  },
  {
    id: 'interview',
    labelKey: 'CHAT.SUGGESTIONS.INTERVIEW_LABEL',
    promptKey: 'CHAT.SUGGESTIONS.INTERVIEW_PROMPT',
    Icon: MessageCircleQuestion,
  },
  {
    id: 'plan',
    labelKey: 'CHAT.SUGGESTIONS.PLAN_LABEL',
    promptKey: 'CHAT.SUGGESTIONS.PLAN_PROMPT',
    Icon: CalendarCheck,
  },
];

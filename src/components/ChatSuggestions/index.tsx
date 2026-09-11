'use client';

import { type FC } from 'react';

import { useTranslation } from '@/hooks';

import { CHAT_SUGGESTIONS } from './const';
import { type IChatSuggestionsProps } from './typings';

import { Container, IconWrapper, SuggestionButton } from './styles';

const ChatSuggestions: FC<IChatSuggestionsProps> = (props) => {
  const { onSelect, disabled = false } = props;

  const { t } = useTranslation();

  return (
    <Container>
      {CHAT_SUGGESTIONS.map(({ id, labelKey, promptKey, Icon }) => (
        <SuggestionButton
          key={id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(t(promptKey))}
        >
          <IconWrapper>
            <Icon size={16} />
          </IconWrapper>
          {t(labelKey)}
        </SuggestionButton>
      ))}
    </Container>
  );
};

export default ChatSuggestions;

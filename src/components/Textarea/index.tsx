import { ChangeEvent, useState, useEffect, FC } from 'react';

import { Text } from '@/components/Typography';

import { MAX_TEXTAREA_LENGTH } from './constants';
import { ITextareaProps } from './typings';

import {
  Container,
  CounterWrapper,
  ErrorText,
  StyledTextarea,
  TextareaContainer,
  Wrapper,
} from './styles';

const Textarea: FC<ITextareaProps> = ({
  className,
  error,
  maxLength = MAX_TEXTAREA_LENGTH,
  ...props
}) => {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (typeof props.value === 'string') {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) props.onChange(e);

    setValue(e.target.value);
  };

  return (
    <Container>
      <Wrapper hasError={!!error} className={className}>
        <TextareaContainer>
          <StyledTextarea
            data-slot="textarea"
            hasError={!!error}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            className={className}
            {...props}
          />
          <CounterWrapper>
            {String(value).length}/{maxLength}
          </CounterWrapper>
        </TextareaContainer>
      </Wrapper>

      {error && (
        <ErrorText>
          <Text variant="s">{error}</Text>
        </ErrorText>
      )}
    </Container>
  );
};

export default Textarea;

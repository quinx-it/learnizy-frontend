import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState, useEffect } from 'react';
import { Controller, useForm, Resolver } from 'react-hook-form';

import {
  useUploadVoiceMutation,
  useCreateLessonAIQueryMutation,
  useGetLessonAIQueriesQuery,
  CreateLessonAIQueryRequestType,
} from '@/api/endpoints/voice';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import VoiceRecorderControl from '@/components/VoiceRecorderControl';

import { AIQueryStatus } from './constants';
import { IAIQuestionFormValues, IVoiceRecorderFormProps } from './typings';
import { schema } from './validation';

import {
  ErrorContainer,
  ErrorText,
  Form,
  LoadingContainer,
  ResponseContainer,
  FieldWrapper,
  SubmitButtonWrapper,
} from './styles';

const VoiceRecorderForm: FC<IVoiceRecorderFormProps> = (props) => {
  const { lessonId } = props;

  const [uploadVoice] = useUploadVoiceMutation();
  const [createLessonAIQuery, { isLoading: isCreatingQuery }] = useCreateLessonAIQueryMutation();
  const [lastCreatedQueryId, setLastCreatedQueryId] = useState<number | null>(null);
  const [lastAIResponse, setLastAIResponse] = useState<string | null>(null);
  const [lastAIError, setLastAIError] = useState<string | null>(null);

  const { data: queriesPage, isLoading: isLoadingQueries } = useGetLessonAIQueriesQuery(
    { lessonId, page: 0, size: 1, sort: 'createdAt,desc' },
    { pollingInterval: lastCreatedQueryId ? 5000 : 0, skip: !lastCreatedQueryId },
  );

  const lastAIQuery = queriesPage?.content?.[0];
  const isLoadingLastQuery = isLoadingQueries && lastCreatedQueryId !== null;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAIQuestionFormValues>({
    resolver: yupResolver(schema) as Resolver<IAIQuestionFormValues>,
    defaultValues: { file: undefined },
  });

  useEffect(() => {
    if (
      lastAIQuery &&
      lastAIQuery.id === lastCreatedQueryId &&
      lastAIQuery.status !== AIQueryStatus.Pending
    ) {
      if (lastAIQuery.status === AIQueryStatus.Answered) {
        setLastAIResponse(lastAIQuery.aiResponseText || 'ИИ ответил на ваш вопрос.');
        setLastAIError(null);
      } else if (lastAIQuery.status === AIQueryStatus.Failed) {
        setLastAIError(lastAIQuery.processingError || 'Не удалось получить ответ от ИИ.');
        setLastAIResponse(null);
      }

      setLastCreatedQueryId(null);
    }
  }, [lastAIQuery, lastCreatedQueryId]);

  const onSubmit = async (data: IAIQuestionFormValues) => {
    if (!data.file) {
      showToast('error', 'Ошибка', 'Пожалуйста, запишите вопрос голосом.');

      return;
    }

    const formData = new FormData();
    formData.append('file', data.file, 'recording.webm');

    let audioUrl: string | undefined;

    try {
      const { downloadUrl } = await uploadVoice(formData).unwrap();
      audioUrl = downloadUrl;
    } catch {
      showToast('error', 'Ошибка загрузки аудио', 'Не удалось загрузить аудиофайл.');

      return;
    }

    try {
      const requestBody: CreateLessonAIQueryRequestType = {
        audioUrl,
        questionText: null,
      };
      const result = await createLessonAIQuery({ lessonId, body: requestBody }).unwrap();
      setLastCreatedQueryId(result.id);

      showToast(
        'success',
        'Вопрос отправлен!',
        'ИИ обрабатывает ваш вопрос. Пожалуйста, ожидайте ответа.',
      );

      setValue('file', undefined);
    } catch {
      showToast('error', 'Ошибка', 'Не удалось создать вопрос к ИИ.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <FieldWrapper>
            <VoiceRecorderControl onChange={field.onChange} />
            {errors.file && <ErrorText>{errors.file.message}</ErrorText>}
          </FieldWrapper>
        )}
      />

      <SubmitButtonWrapper>
        <Button type="submit" disabled={isCreatingQuery || isLoadingLastQuery} size="medium">
          {isCreatingQuery || (lastCreatedQueryId && isLoadingLastQuery) ? (
            <Spinner />
          ) : (
            'Задать вопрос'
          )}
        </Button>
      </SubmitButtonWrapper>

      {lastCreatedQueryId && !lastAIResponse && !lastAIError && (
        <LoadingContainer>
          <Spinner />
          <Text>Идёт ожидание обработки ИИ...</Text>
        </LoadingContainer>
      )}

      {lastAIResponse && (
        <ResponseContainer>
          <Text variant="l-bold">Ответ:</Text>
          <Text>{lastAIResponse}</Text>
        </ResponseContainer>
      )}

      {lastAIError && (
        <ErrorContainer>
          <Text variant="l-bold">Ошибка:</Text>
          <Text>{lastAIError}</Text>
        </ErrorContainer>
      )}
    </Form>
  );
};

export default VoiceRecorderForm;

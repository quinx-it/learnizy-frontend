import { yupResolver } from '@hookform/resolvers/yup';
import { type FC, useState, useEffect } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';

import {
  AIQueryStatus,
  useUploadVoiceMutation,
  useCreateLessonAIQueryMutation,
  useGetLessonAIQueriesQuery,
  type CreateLessonAIQueryRequestType,
} from '@/api/endpoints/voice';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import VoiceRecorderControl from '@/components/VoiceRecorderControl';
import { useTranslation } from '@/hooks';

import { createSchema } from './const';
import { type IAIQuestionFormValues, type IVoiceRecorderFormProps } from './typings';

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
  const { t } = useTranslation();

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
    resolver: yupResolver(createSchema(t)) as Resolver<IAIQuestionFormValues>,
    defaultValues: { file: undefined },
  });

  useEffect(() => {
    if (
      lastAIQuery &&
      lastAIQuery.id === lastCreatedQueryId &&
      lastAIQuery.status !== AIQueryStatus.Pending
    ) {
      if (lastAIQuery.status === AIQueryStatus.Answered) {
        setLastAIResponse(lastAIQuery.aiResponseText || t('VOICE_RECORDER.AI_RESPONDED'));
        setLastAIError(null);
      } else if (lastAIQuery.status === AIQueryStatus.Failed) {
        setLastAIError(lastAIQuery.processingError || t('VOICE_RECORDER.AI_ERROR'));
        setLastAIResponse(null);
      }

      setLastCreatedQueryId(null);
    }
  }, [lastAIQuery, lastCreatedQueryId]);

  const onSubmit = async (data: IAIQuestionFormValues) => {
    if (!data.file) {
      showToast('error', t('COMMON.ERROR'), t('VOICE_RECORDER.ERROR_RECORD_VOICE'));

      return;
    }

    const formData = new FormData();
    formData.append('file', data.file, 'recording.webm');

    let audioUrl: string | undefined;

    try {
      const { downloadUrl } = await uploadVoice(formData).unwrap();
      audioUrl = downloadUrl;
    } catch {
      showToast(
        'error',
        t('CHAT_INPUT.ERROR_UPLOADING_AUDIO'),
        t('VOICE_RECORDER.ERROR_UPLOAD_AUDIO'),
      );

      return;
    }

    try {
      const requestBody: CreateLessonAIQueryRequestType = {
        audioUrl,
        questionText: null,
      };
      const result = await createLessonAIQuery({ lessonId, body: requestBody }).unwrap();
      setLastCreatedQueryId(result.id);

      showToast('success', t('VOICE_RECORDER.QUESTION_SENT'), t('VOICE_RECORDER.AI_PROCESSING'));

      setValue('file', undefined);
    } catch {
      showToast('error', t('COMMON.ERROR'), t('VOICE_RECORDER.ERROR_CREATE_QUESTION'));
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
            t('VOICE_RECORDER.ASK_QUESTION')
          )}
        </Button>
      </SubmitButtonWrapper>

      {lastCreatedQueryId && !lastAIResponse && !lastAIError && (
        <LoadingContainer>
          <Spinner />
          <Text>{t('VOICE_RECORDER.WAITING_AI')}</Text>
        </LoadingContainer>
      )}

      {lastAIResponse && (
        <ResponseContainer>
          <Text variant="l-bold">{t('VOICE_RECORDER.ANSWER')}</Text>
          <Text>{lastAIResponse}</Text>
        </ResponseContainer>
      )}

      {lastAIError && (
        <ErrorContainer>
          <Text variant="l-bold">{t('VOICE_RECORDER.ERROR')}</Text>
          <Text>{lastAIError}</Text>
        </ErrorContainer>
      )}
    </Form>
  );
};

export default VoiceRecorderForm;

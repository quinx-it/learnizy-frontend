import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { showToast } from '@/shared/ui/toaster';
import { VoiceRecorderControl } from '../voice-recorder-control';
import { schema } from './validation';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import {
  useCreateLessonAIQueryMutation,
  useGetLessonAIQueriesQuery,
} from '@/api/endpoints/voice/lessonAI';
import { CreateLessonAIQueryRequest } from '@/api/endpoints/voice/types';
import { useState, useEffect } from 'react';
import { Text } from '@/shared/ui/typography';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Resolver } from 'react-hook-form';

export enum AIQueryStatus {
  PENDING = 'PENDING',
  ANSWERED = 'ANSWERED',
  FAILED = 'FAILED',
}

interface AIQuestionFormValues {
  file?: Blob;
}

interface VoiceRecorderFormProps {
  lessonId: number;
}

export const VoiceRecorderForm: FC<VoiceRecorderFormProps> = ({ lessonId }) => {
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
  } = useForm<AIQuestionFormValues>({
    resolver: yupResolver(schema) as Resolver<AIQuestionFormValues>,
    defaultValues: { file: undefined },
  });

  useEffect(() => {
    if (
      lastAIQuery &&
      lastAIQuery.id === lastCreatedQueryId &&
      lastAIQuery.status !== AIQueryStatus.PENDING
    ) {
      if (lastAIQuery.status === AIQueryStatus.ANSWERED) {
        setLastAIResponse(lastAIQuery.aiResponseText || 'ИИ ответил на ваш вопрос.');
        setLastAIError(null);
      } else if (lastAIQuery.status === AIQueryStatus.FAILED) {
        setLastAIError(lastAIQuery.processingError || 'Не удалось получить ответ от ИИ.');
        setLastAIResponse(null);
      }
      setLastCreatedQueryId(null);
    }
  }, [lastAIQuery, lastCreatedQueryId]);

  const onSubmit = async (data: AIQuestionFormValues) => {
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
      const requestBody: CreateLessonAIQueryRequest = {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <div>
            <VoiceRecorderControl onChange={field.onChange} />
            {errors.file && <p className="text-error">{errors.file.message}</p>}
          </div>
        )}
      />

      <Button
        type="submit"
        disabled={isCreatingQuery || isLoadingLastQuery}
        size="medium"
        className="w-fit"
      >
        {isCreatingQuery || (lastCreatedQueryId && isLoadingLastQuery) ? (
          <Spinner />
        ) : (
          'Задать вопрос'
        )}
      </Button>

      {lastCreatedQueryId && !lastAIResponse && !lastAIError && (
        <div className="mt-4 flex items-center gap-2 text-gray-600">
          <Spinner />
          <Text>Идёт ожидание обработки ИИ...</Text>
        </div>
      )}

      {lastAIResponse && (
        <div className="mt-4 bg-gray-100 p-4">
          <Text variant="l-bold">Ответ:</Text>
          <Text>{lastAIResponse}</Text>
        </div>
      )}

      {lastAIError && (
        <CardWrapper className="mt-4 bg-red-100 p-4 text-red-700">
          <Text variant="l-bold">Ошибка:</Text>
          <Text>{lastAIError}</Text>
        </CardWrapper>
      )}
    </form>
  );
};

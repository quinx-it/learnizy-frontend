import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import { VoiceFormValues } from '@/api/endpoints/voice/types';
import { schema } from './validation';
import { VoiceRecorderControl } from '../voice-recorder-control';
import { showToast } from '@/shared/ui/toaster';

export const VoiceRecorderForm = () => {
  const [uploadVoice, { isLoading }] = useUploadVoiceMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VoiceFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: VoiceFormValues) => {
    if (!data.file) return;

    const formData = new FormData();
    formData.append('file', data.file, 'recording.webm');

    try {
      const { downloadUrl } = await uploadVoice(formData).unwrap();
      showToast(
        'success',
        'Ура!',
        'После проверки ментором вам будет выставленна оценка и отправлены комментарии',
      );
      console.log(downloadUrl)
    } catch (e) {
      console.error('Ошибка загрузки файла:', e);
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
      <Button type="submit" disabled={isLoading} size="medium" className="w-fit">
        {isLoading ? <Spinner /> : 'Проверить'}
      </Button>
    </form>
  );
};

import { useVoiceRecorder } from '@/shared/hooks';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/shared/ui/button';
import { MicIcon, TrashCanIcon } from '@/shared/ui/icons';
import { AudioPlayer } from '../audio-player';
import { useEffect, useState } from 'react';
import { Text } from '@/shared/ui/typography';

const schema = yup.object({
  voice: yup.mixed<Blob>().required(),
});

type VoiceForm = {
  voice: Blob;
};

export const VoiceRecorderField = () => {
  const [duration, setDuration] = useState(0);

  const { recording, audioUrl, audioBlob, startRecording, stopRecording, reset } =
    useVoiceRecorder();
  //   const [uploadVoice, { isLoading }] = useUploadVoiceMutation()

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: VoiceForm) => {
    if (data.voice) {
      //   const res = await uploadVoice(data.voice).unwrap()
      //   console.log('Файл загружен:', res.url)
    }
  };

  useEffect(() => {
    if (audioBlob) {
      setValue('voice', audioBlob);
    }
  }, [audioBlob, setValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (recording) {
      setDuration(0);
      interval = setInterval(() => setDuration((d) => d + 1), 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recording]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="voice"
        render={({ field }) => (
          <>
            {!audioUrl && !recording && (
              <Button
                type="button"
                onClick={startRecording}
                size="medium"
                className="flex max-w-fit gap-3"
              >
                <MicIcon /> Начать запись
              </Button>
            )}
            {!audioUrl && recording && (
              <div className="flex items-center justify-baseline gap-3">
                <Button
                  type="button"
                  onClick={stopRecording}
                  size="medium"
                  className="flex max-w-fit gap-3"
                >
                  ⏹ Остановить
                </Button>
                <Text variant="m" className="text-medium">
                  {new Date(duration * 1000).toISOString().slice(14, 19)}
                </Text>
              </div>
            )}

            {audioUrl && (
              <div className="flex items-center justify-baseline gap-3">
                <AudioPlayer src={audioUrl} />
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    field.onChange(null);
                  }}
                  className="max-w-fit"
                >
                  <TrashCanIcon />
                </button>
              </div>
            )}
          </>
        )}
      />
      <Button type="submit" disabled={!audioUrl} size="medium" className="w-fit">
        Проверить
      </Button>
    </form>
  );
};

import { useEffect, useState, FC } from 'react';

import { useVoiceRecorder } from '@/hooks';
import { Button } from '@/components/ui/Button';
import { MicIcon, TrashCanIcon } from '@/components/ui/Icons';
import { Text } from '@/components/ui/Typography';

import { AudioPlayer } from '../AudioPlayer';

import { PropsType } from './typings';

export const VoiceRecorderControl: FC<PropsType> = (props) => {
  const { onChange } = props;

  const { recording, audioUrl, audioBlob, startRecording, stopRecording, reset } =
    useVoiceRecorder();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    onChange(audioBlob ?? null);
  }, [audioBlob, onChange]);

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

  const handleClear = () => {
    reset();
    onChange(null);
  };

  return (
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
        <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-3">
          <AudioPlayer src={audioUrl} />
          <button type="button" onClick={handleClear} className="max-w-fit">
            <TrashCanIcon />
          </button>
        </div>
      )}
    </>
  );
};

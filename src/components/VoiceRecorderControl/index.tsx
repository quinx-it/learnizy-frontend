import { useEffect, useState, FC } from 'react';

import AudioPlayer from '@/components/AudioPlayer';
import { MicIcon, TrashCanIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { useVoiceRecorder } from '@/hooks';

import { PropsType } from './typings';

import { ButtonWrapper, Container, DeleteButton } from './styles';

const VoiceRecorderControl: FC<PropsType> = (props) => {
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
        <ButtonWrapper type="button" onClick={startRecording} size="medium">
          <MicIcon /> Начать запись
        </ButtonWrapper>
      )}

      {!audioUrl && recording && (
        <Container>
          <ButtonWrapper type="button" onClick={stopRecording} size="medium">
            ⏹ Остановить
          </ButtonWrapper>
          <Text variant="m" className="text-medium">
            {new Date(duration * 1000).toISOString().slice(14, 19)}
          </Text>
        </Container>
      )}

      {audioUrl && (
        <Container>
          <AudioPlayer src={audioUrl} />
          <DeleteButton type="button" onClick={handleClear}>
            <TrashCanIcon />
          </DeleteButton>
        </Container>
      )}
    </>
  );
};

export default VoiceRecorderControl;

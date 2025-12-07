import Image from 'next/image';
import { useEffect, useState, FC } from 'react';

import AudioPlayer from '@/components/AudioPlayer';
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
          <Image src="/images/mic-icon.svg" alt="Mic icon" width={16} height={20} /> Начать запись
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
            <Image src="/images/trash-can-icon.svg" alt="Trash can icon" width={32} height={32} />
          </DeleteButton>
        </Container>
      )}
    </>
  );
};

export default VoiceRecorderControl;

'use client';

import { useEffect, useRef, useState, FC } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { PlayPauseIcon, AaIcon, ArrowCloseIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';

import { IAudioPlayerProps } from './typings';

import {
  Container,
  ControlsContainer,
  PlayerContainer,
  PlayButton,
  TimeText,
  TranscriptButton,
  TranscriptContainer,
  TranscriptText,
  WaveformContainer,
} from './styles';

const AudioPlayer: FC<IAudioPlayerProps> = (props) => {
  const { src, transcript } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ffffffff',
      progressColor: '#A9DBE9',
      cursorWidth: 0,
      height: 20,
      barWidth: 2,
      barRadius: 2,
      normalize: true,
    }) as WaveSurfer & { isDestroyed?: boolean };

    wavesurferRef.current = ws;

    const onReady = () => setDuration(ws.getDuration());
    const onAudioProcess = () => setTime(ws.getCurrentTime());
    const onFinish = () => setIsPlaying(false);

    ws.on('ready', onReady);
    ws.on('audioprocess', onAudioProcess);
    ws.on('finish', onFinish);

    ws.load(src).catch((e: unknown) => {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('Ошибка загрузки аудио:', e);
      }
    });

    return () => {
      ws.un('ready', onReady);
      ws.un('audioprocess', onAudioProcess);
      ws.un('finish', onFinish);

      if (!ws.isDestroyed) ws.destroy();
    };
  }, [src]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    wavesurferRef.current.playPause();
    setIsPlaying(wavesurferRef.current.isPlaying());
  };

  const toggleTranscript = () => {
    setShowTranscript((prev) => !prev);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');

    return `${m}:${s}`;
  };

  return (
    <Container>
      <PlayerContainer>
        <TimeText>
          {formatTime(time)}/{formatTime(duration)}
        </TimeText>

        <WaveformContainer ref={containerRef} />

        <ControlsContainer>
          <PlayButton type="button" onClick={togglePlay}>
            <PlayPauseIcon color="white" isPlaying={isPlaying} />
          </PlayButton>
          {transcript && (
            <TranscriptButton type="button" onClick={toggleTranscript}>
              {showTranscript ? <ArrowCloseIcon /> : <AaIcon />}
            </TranscriptButton>
          )}
        </ControlsContainer>
      </PlayerContainer>

      {transcript && (
        <TranscriptContainer
          ref={transcriptRef}
          maxHeight={showTranscript ? transcriptRef.current?.scrollHeight : 0}
        >
          <TranscriptText>
            <Text variant="m">{transcript}</Text>
          </TranscriptText>
        </TranscriptContainer>
      )}
    </Container>
  );
};

export default AudioPlayer;

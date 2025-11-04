'use client';

import { PlayPauseIcon, AaIcon, ArrowCloseIcon } from '@/ui/icons';
import React, { useEffect, useRef, useState, FC } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Text } from '@/ui/typography';
import { IAudioPlayerProps } from './typings';

export const AudioPlayer: FC<IAudioPlayerProps> = (props) => {
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

    ws.load(src).catch((e) => {
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
    <div>
      <div className="border-medium flex h-[24px] w-100 max-w-[250px] items-center justify-between gap-2 rounded-full p-1 px-5 md:max-w-[400px]">
        <span className="text-medium w-fit text-[16px] text-white">
          {formatTime(time)}/{formatTime(duration)}
        </span>

        <div ref={containerRef} className="h-[20px] flex-1" />

        <div className="flex items-center">
          <button type="button" onClick={togglePlay} className="text-medium mr-1.5 w-6">
            <PlayPauseIcon color="white" isPlaying={isPlaying} />
          </button>
          {transcript && (
            <button
              type="button"
              onClick={toggleTranscript}
              className="rounded py-1 text-sm text-white"
            >
              {showTranscript ? <ArrowCloseIcon /> : <AaIcon />}
            </button>
          )}
        </div>
      </div>

      {transcript && (
        <div
          ref={transcriptRef}
          className={`overflow-hidden px-5 transition-[max-height] duration-500 ease-in-out`}
          style={{
            maxHeight: showTranscript ? transcriptRef.current?.scrollHeight + 'px' : '0px',
          }}
        >
          <Text variant="m" className="mt-3 text-base text-white">
            {transcript}
          </Text>
        </div>
      )}
    </div>
  );
};

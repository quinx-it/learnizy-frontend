'use client';

import { PlayPauseIcon } from '@/shared/ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#A9DBE9',
      progressColor: '#238BA7',
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

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="border-medium bg-light flex w-full max-w-2xl items-center justify-between gap-6 rounded-full border-[1.25px] px-6 py-1.5">
      <span className="text-medium w-fit text-[16px]">
        {formatTime(time)}/{formatTime(duration)}
      </span>

      <div ref={containerRef} className="h-[24px] flex-1" />

      <div className="flex items-center gap-2">
        <button type="button" onClick={togglePlay} className="text-medium w-6">
          <PlayPauseIcon isPlaying={isPlaying} />
        </button>
      </div>
    </div>
  );
};

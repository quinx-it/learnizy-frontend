'use client'

import { PlayPauseIcon } from '@/shared/ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface AudioPlayerProps {
  src: string
}

export const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#A9DBE9',
      progressColor: '#238BA7',
      cursorWidth: 0,
      height: 20,
      barWidth: 2,
      barRadius: 2,
      normalize: true
    })

    ws.load(src)
    wavesurferRef.current = ws

    ws.on('ready', () => {
      setDuration(ws.getDuration())
    })

    ws.on('audioprocess', () => {
      setTime(ws.getCurrentTime())
    })

    ws.on('finish', () => {
      setIsPlaying(false)
    })

    return () => {
      ws.destroy()
    }
  }, [src])

  const togglePlay = () => {
    if (!wavesurferRef.current) return
    wavesurferRef.current.playPause()
    setIsPlaying(wavesurferRef.current.isPlaying())
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className='flex items-center justify-between rounded-full border-[1.25px] border-medium px-6 py-1.5 gap-6 w-full max-w-2xl bg-light'>
      <span className='text-[16px] text-medium w-fit'>
        {formatTime(time)}/{formatTime(duration)}
      </span>

      <div ref={containerRef} className='flex-1 h-[24px]' />

      <div className='flex gap-2 items-center'>
        <button onClick={togglePlay} className='text-medium w-6'><PlayPauseIcon isPlaying={isPlaying} /></button>
      </div>
    </div>
  )
}
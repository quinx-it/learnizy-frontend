'use client';

import {
  useState,
  useRef,
  FC,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useEffect,
  useCallback,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { X, Check, ArrowUp, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import { Button } from '@/shared/ui/button';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';
import { MicChatIcon, AttachIcon, SendIcon } from '@/shared/ui/icons';

import { IChatInputProps, IAttachment, ILocalFile } from './typings';
import { MIN_RECORDING_DURATION_MS } from './constants';

export const ChatInput: FC<IChatInputProps> = (props) => {
  const { onSendMessage, isLoading, onStopResponse, isWaitingResponse } = props;

  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<ILocalFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const microphoneRef = useRef<HTMLButtonElement | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [uploadVoice, { isLoading: isUploading }] = useUploadVoiceMutation();
  const isDisabled = isLoading || isUploading;

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const newFiles: ILocalFile[] = Array.from(files).map((file) => ({
      id: nanoid(),
      file,
    }));

    setAttachedFiles((prev) => [...prev, ...newFiles]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSendClick = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    try {
      const uploadedAttachments: IAttachment[] = [];

      for (const localFile of attachedFiles) {
        const formData = new FormData();
        formData.append('file', localFile.file);
        const response = await uploadVoice(formData).unwrap();

        uploadedAttachments.push({
          downloadUrl: response.downloadUrl,
          originalFilename: localFile.file.name,
          contentType: localFile.file.type,
          size: localFile.file.size,
        });
      }

      await onSendMessage({
        text: inputValue,
        attachments: uploadedAttachments,
      });

      setInputValue('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        setIsExpanded(false);
      }
    } catch {
      showToast('error', t('CHAT_INPUT.ERROR_SENDING_FILES'), '');
    }
  };

  const handleUploadAudio = async () => {
    if (!audioBlob) {
      showToast('error', t('CHAT_INPUT.NO_DATA_TO_SEND'), '');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await uploadVoice(formData).unwrap();

      await onSendMessage({
        audioFileUrl: response.downloadUrl,
      });

      setAudioBlob(null);
      if (waveformRef.current) {
        waveformRef.current.destroy();
        waveformRef.current = null;
      }
    } catch {
      showToast('error', t('CHAT_INPUT.ERROR_UPLOADING_AUDIO'), '');
    }
  };

  const startRecording = async () => {
    if (isUploading) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      const audioContext = new (window.AudioContext ||
        (window as unknown as Window & { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);

        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsLocked(false);
      setRecordingDuration(0);
      recordingStartTimeRef.current = Date.now();

      const visualizeAudio = () => {
        if (!analyserRef.current || !mediaRecorderRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const levels = Array.from(dataArray.slice(0, 10)).map((value) => value / 255);
        setAudioLevels(levels);

        if (mediaRecorderRef.current.state === 'recording') {
          animationFrameRef.current = requestAnimationFrame(visualizeAudio);
        }
      };
      visualizeAudio();
    } catch {
      showToast('error', t('CHAT_INPUT.ERROR'), t('CHAT_INPUT.ERROR_MICROPHONE_ACCESS'));
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      const duration = Date.now() - (recordingStartTimeRef.current || 0);
      if (duration < MIN_RECORDING_DURATION_MS) {
        showToast('info', t('CHAT_INPUT.RECORDING_TOO_SHORT'), t('CHAT_INPUT.HOLD_TO_RECORD'));
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      } else {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setIsLocked(false);
    }
  }, [isRecording, t]);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioChunksRef.current = [];
      setIsRecording(false);
      setIsLocked(false);
      setRecordingDuration(0);
      setAudioLevels([]);
    }
  }, [isRecording]);

  const discardRecording = () => {
    setAudioBlob(null);
    audioChunksRef.current = [];
    if (waveformRef.current) {
      waveformRef.current.destroy();
      waveformRef.current = null;
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isDisabled) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    setIsExpanded(el.scrollHeight > 40);
  };

  const isComponentExpanded = isExpanded || attachedFiles.length > 0;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        if (recordingStartTimeRef.current) {
          const duration = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
          setRecordingDuration(duration);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setRecordingDuration((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (audioBlob && waveformContainerRef.current && !waveformRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const ws = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: '#a0a0a0',
        progressColor: '#238BA7',
        cursorWidth: 0,
        height: 40,
        barWidth: 2,
        barRadius: 2,
        normalize: true,
        interact: false,
      }) as WaveSurfer & { isDestroyed?: boolean };

      waveformRef.current = ws;
      ws.load(audioUrl);

      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.paddingTop = attachedFiles.length > 0 ? '18px' : '0px';
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
      setIsExpanded(textareaRef.current.scrollHeight > 40 || attachedFiles.length > 0);
    }
  }, [attachedFiles]);

  const handleMouseDown = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (isLocked) return;
    setDragStart({ x: e.clientX, y: e.clientY });
    startRecording();
    e.preventDefault();
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLButtonElement>) => {
    if (isLocked) return;
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    startRecording();
    e.preventDefault();
  };

  const handleMouseUp = useCallback(
    (e?: ReactMouseEvent<HTMLButtonElement>) => {
      if (!isLocked) {
        stopRecording();
      }
      setDragStart(null);
      if (e) e.preventDefault();
    },
    [isLocked, stopRecording],
  );

  const handleTouchEnd = useCallback(
    (e?: ReactTouchEvent<HTMLButtonElement>) => {
      if (!isLocked) {
        stopRecording();
      }
      setDragStart(null);
      if (e) e.preventDefault();
    },
    [isLocked, stopRecording],
  );

  useEffect(() => {
    if (!dragStart) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!dragStart || !isRecording) return;

      const deltaY = e.clientY - dragStart.y;
      const deltaX = dragStart.x - e.clientX;

      if (deltaY < -50 && !isLocked) {
        setIsLocked(true);
      }

      if (deltaX > 100) {
        cancelRecording();
        setDragStart(null);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!dragStart || !isRecording) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStart.y;
      const deltaX = dragStart.x - touch.clientX;

      if (deltaY < -50 && !isLocked) {
        setIsLocked(true);
      }

      if (deltaX > 100) {
        cancelRecording();
        setDragStart(null);
      }
    };

    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchEnd = () => handleTouchEnd();

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [dragStart, isRecording, isLocked, cancelRecording, handleMouseUp, handleTouchEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={clsx(
        'relative flex w-full max-w-[666px] border border-gray-300 bg-white p-3 shadow-lg',
        {
          'h-auto items-end rounded-3xl': isComponentExpanded,
          'h-[48px] items-center rounded-full': !isComponentExpanded,
        },
      )}
    >
      {attachedFiles.length > 0 && (
        <div className="absolute top-2 left-3 z-10 flex flex-wrap gap-2">
          {attachedFiles.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-2 rounded-full bg-[#E8F8FC] py-1 pr-2 pl-3 text-sm text-[#238BA7]"
            >
              <span className="max-w-[150px] truncate" title={att.file.name}>
                {att.file.name}
              </span>
              <button
                onClick={() => handleRemoveFile(att.id)}
                className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#238BA7] hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="cursor-pointer p-2 text-gray-400 transition hover:text-gray-500"
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <AttachIcon />
      </button>
      <input ref={fileInputRef} type="file" multiple hidden onChange={handleFileSelect} />
      <textarea
        ref={textareaRef}
        placeholder={
          isRecording ? formatTime(recordingDuration) : t('CHAT_INPUT.WRITE_YOUR_QUESTION')
        }
        className={clsx(
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg flex-1 resize-none overflow-y-auto bg-transparent px-3 text-[16px] text-black outline-none',
          {
            'mt-8 mb-2': attachedFiles.length > 0,
            'mt-0 mb-0': attachedFiles.length === 0,
            'placeholder:text-red-500': isRecording,
            'placeholder:text-gray-400': !isRecording,
          },
        )}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        disabled={isDisabled}
        rows={1}
      />

      <div className="relative">
        {isRecording && !isLocked && (
          <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 animate-bounce items-center gap-1 text-xs text-gray-600">
            <ArrowUp size={17} />
            <span>{t('CHAT_INPUT.SWIPE_UP')} </span>
          </div>
        )}
        <button
          ref={microphoneRef}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-300 hover:bg-[#E8F8FC]',
            {
              'scale-110 bg-gradient-to-r from-[#238BA7] to-[#00617B] text-white': isRecording,
            },
          )}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          disabled={isDisabled}
        >
          {isUploading ? (
            <Spinner />
          ) : isRecording ? (
            <div className="flex items-center justify-center gap-[1.5px]">
              {(audioLevels.length > 0 ? audioLevels : [0.3, 0.5, 0.4, 0.3, 0.6, 0.2]).map(
                (level, index) => {
                  const barHeight = 4 + level * 16;
                  return (
                    <div
                      key={index}
                      className="w-[1.5px] rounded bg-white transition-[height] duration-100 ease-out"
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                },
              )}
            </div>
          ) : (
            <MicChatIcon />
          )}
        </button>
      </div>

      {isRecording && !audioBlob && (
        <Button
          onClick={stopRecording}
          variant="blue"
          size="icon"
          className="ml-0.5 !h-8 !w-8 !rounded-full"
          title={t('CHAT_INPUT.STOP_RECORDING')}
        >
          <Square size={12} fill="currentColor" />
        </Button>
      )}

      {audioBlob && (
        <>
          <Button
            onClick={discardRecording}
            variant="gray"
            size="icon"
            className="ml-0.5 !rounded-full"
            title={t('CHAT_INPUT.CANCEL')}
          >
            <X size={18} />
          </Button>
          <Button
            onClick={handleUploadAudio}
            variant="green"
            size="icon"
            className="ml-0.5 !rounded-full"
            title={t('CHAT_INPUT.SEND')}
          >
            <Check size={18} />
          </Button>
        </>
      )}

      {!isRecording && !audioBlob && (
        <>
          {isWaitingResponse && onStopResponse && (
            <Button
              onClick={onStopResponse}
              variant="blue"
              size="icon"
              className="ml-0.5 !h-8 !w-8 !rounded-full"
              title={t('CHAT_INPUT.STOP_RESPONSE')}
            >
              <Square size={12} fill="currentColor" />
            </Button>
          )}
          <Button
            className="ml-0.5 cursor-pointer bg-white p-2 text-gray-400 transition hover:bg-[#E8F8FC]"
            onClick={handleSendClick}
          >
            <SendIcon />
          </Button>
        </>
      )}
    </div>
  );
};

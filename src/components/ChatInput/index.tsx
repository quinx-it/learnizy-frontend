'use client';

import { X, Check, ArrowUp } from 'lucide-react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
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

import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';

import { MIN_RECORDING_DURATION_MS } from './constants';
import { IChatInputProps, ILocalFile } from './typings';

import {
  AttachButton,
  AttachedFileItem,
  AttachedFileName,
  AttachedFilesContainer,
  AudioBar,
  AudioBarsContainer,
  Container,
  DiscardButton,
  HiddenFileInput,
  MicrophoneButton,
  MicrophoneContainer,
  RemoveFileButton,
  SendButton,
  StopButton,
  StopButtonBar,
  StopButtonContent,
  StyledTextarea,
  SwipeUpHint,
  SwipeUpText,
  UploadAudioButton,
} from './styles';

const ChatInput: FC<IChatInputProps> = (props) => {
  const { onSendMessage, isLoading } = props;

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
    const { files } = e.target;

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
      const uploadPromises = attachedFiles.map(async (localFile) => {
        const formData = new FormData();
        formData.append('file', localFile.file);
        const response = await uploadVoice(formData).unwrap();

        return {
          downloadUrl: response.downloadUrl,
          originalFilename: localFile.file.name,
          contentType: localFile.file.type,
          size: localFile.file.size,
        };
      });

      const uploadedAttachments = await Promise.all(uploadPromises);

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
    <Container isExpanded={isComponentExpanded}>
      {attachedFiles.length > 0 && (
        <AttachedFilesContainer>
          {attachedFiles.map((att) => (
            <AttachedFileItem key={att.id}>
              <AttachedFileName title={att.file.name}>{att.file.name}</AttachedFileName>
              <RemoveFileButton type="button" onClick={() => handleRemoveFile(att.id)}>
                <X size={14} />
              </RemoveFileButton>
            </AttachedFileItem>
          ))}
        </AttachedFilesContainer>
      )}
      <AttachButton
        type="button"
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image src="/images/attach-icon.svg" alt="Attach icon" width={15} height={24} />
      </AttachButton>
      <HiddenFileInput ref={fileInputRef} type="file" multiple onChange={handleFileSelect} />
      <StyledTextarea
        ref={textareaRef}
        placeholder={
          isRecording ? formatTime(recordingDuration) : t('CHAT_INPUT.WRITE_YOUR_QUESTION')
        }
        hasAttachedFiles={attachedFiles.length > 0}
        isRecording={isRecording}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        disabled={isDisabled}
        rows={1}
      />

      <MicrophoneContainer>
        {isRecording && !isLocked && (
          <SwipeUpHint>
            <ArrowUp size={17} />
            <SwipeUpText>{t('CHAT_INPUT.SWIPE_UP')} </SwipeUpText>
          </SwipeUpHint>
        )}
        <MicrophoneButton
          ref={microphoneRef}
          type="button"
          isRecording={isRecording}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          disabled={isDisabled}
        >
          {(() => {
            if (isUploading) return <Spinner />;

            if (isRecording) {
              return (
                <AudioBarsContainer>
                  {(audioLevels.length > 0 ? audioLevels : [0.3, 0.5, 0.4, 0.3, 0.6, 0.2]).map(
                    (level, index) => {
                      const barHeight = 4 + level * 16;

                      return <AudioBar key={index} barHeight={barHeight} />;
                    },
                  )}
                </AudioBarsContainer>
              );
            }

            return (
              <Image src="/images/mic-chat-icon.svg" alt="Microphone" width={18} height={24} />
            );
          })()}
        </MicrophoneButton>
      </MicrophoneContainer>

      {isRecording && !audioBlob && (
        <StopButton onClick={stopRecording} title={t('CHAT_INPUT.STOP_RECORDING')}>
          <StopButtonContent>
            <StopButtonBar />
            <StopButtonBar />
          </StopButtonContent>
        </StopButton>
      )}

      {audioBlob && (
        <>
          <DiscardButton onClick={discardRecording} title={t('CHAT_INPUT.CANCEL')}>
            <X size={18} />
          </DiscardButton>
          <UploadAudioButton onClick={handleUploadAudio} title={t('CHAT_INPUT.SEND')}>
            <Check size={18} />
          </UploadAudioButton>
        </>
      )}

      {!isRecording && !audioBlob && (
        <SendButton onClick={handleSendClick}>
          <Image src="/images/send-icon.svg" alt="Send icon" width={24} height={24} />
        </SendButton>
      )}
    </Container>
  );
};

export default ChatInput;

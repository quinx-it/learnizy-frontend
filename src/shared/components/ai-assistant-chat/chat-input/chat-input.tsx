'use client';

import React, { useState, useRef, FC, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { MicChatIcon, MicRecordIcon, AttachIcon, SendIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';
import { IChatInputProps, IAttachment, ILocalFile } from './typing';
import { MIN_RECORDING_DURATION_MS } from './constants';
import { X } from 'lucide-react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

export const ChatInput: FC<IChatInputProps> = (props) => {
  const { onSendMessage, isLoading } = props;

  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<ILocalFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      showToast('error', 'Ошибка при отправке файлов', '');
    }
  };

  const handleUploadAudio = async () => {
    if (audioChunksRef.current.length === 0) {
      showToast('error', 'Нет данных для отправки', '');
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await uploadVoice(formData).unwrap();

      await onSendMessage({
        audioFileUrl: response.downloadUrl,
      });
    } catch {
      showToast('error', 'Ошибка загрузки аудио', '');
    }
  };

  const startRecording = async () => {
    if (isUploading) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        handleUploadAudio();
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      recordingStartTimeRef.current = Date.now();
    } catch {
      showToast('error', 'Ошибка', 'Не удалось получить доступ к микрофону.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      const duration = Date.now() - (recordingStartTimeRef.current || 0);
      if (duration < MIN_RECORDING_DURATION_MS) {
        showToast('info', 'Запись слишком короткая', 'Удерживайте кнопку для записи голоса.');
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      } else {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
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
    if (textareaRef.current) {
      textareaRef.current.style.paddingTop = attachedFiles.length > 0 ? '18px' : '0px';
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
      setIsExpanded(textareaRef.current.scrollHeight > 40 || attachedFiles.length > 0);
    }
  }, [attachedFiles]);

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
        placeholder="Напишите ваш вопрос"
        className={clsx(
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg flex-1 resize-none overflow-y-auto bg-transparent px-3 text-[16px] text-black placeholder-gray-400 outline-none',
          {
            'mt-8 mb-2': attachedFiles.length > 0,
            'mt-0 mb-0': attachedFiles.length === 0,
          },
        )}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        disabled={isDisabled}
        rows={1}
      />

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-[#E8F8FC]',
          {
            'bg-red-500 text-white': isRecording,
          },
        )}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={isDisabled}
      >
        {isUploading ? <Spinner /> : isRecording ? <MicRecordIcon /> : <MicChatIcon />}
      </button>
      <Button
        className="ml-0.5 cursor-pointer bg-white p-2 text-gray-400 transition hover:bg-[#E8F8FC]"
        onClick={handleSendClick}
      >
        <SendIcon />
      </Button>
    </div>
  );
};

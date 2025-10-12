'use client';

import React, { useState, useRef, FC } from 'react';
import { MicChatIcon, MicRecordIcon, AttachIcon, SendIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import { showToast } from '@/shared/ui/toaster';
import { Spinner } from '@/shared/ui/spinner';

interface IChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}
const MIN_RECORDING_DURATION_MS = 500;

export const ChatInput: FC<IChatInputProps> = (props) => {
  const { onSendMessage, isLoading } = props;
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [uploadVoice, { isLoading: isUploading }] = useUploadVoiceMutation();
  const isDisabled = isLoading || isUploading;

  const handleUpload = async () => {
    if (audioChunksRef.current.length === 0) {
      showToast('error', 'Нет данных для отправки', '');
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await uploadVoice(formData).unwrap();
      onSendMessage(response.downloadUrl);
    } catch {
      showToast('error', 'Ошибка загрузки', '');
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
        handleUpload();
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

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        setIsExpanded(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isDisabled) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    setIsExpanded(el.scrollHeight > 40);
  };

  return (
    <div
      className={`flex w-full max-w-[666px] border border-gray-300 bg-white p-3 shadow-lg ${
        isExpanded ? 'h-auto items-end rounded-3xl' : 'h-[48px] items-center rounded-full'
      }`}
    >
      <button
        className="cursor-pointer p-2 text-gray-400 transition hover:text-gray-500"
        disabled={isDisabled}
      >
        <AttachIcon />
      </button>

      <textarea
        ref={textareaRef}
        placeholder="Напишите ваш вопрос"
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg flex-1 resize-none overflow-y-auto bg-transparent px-3 text-[16px] text-black placeholder-gray-400 outline-none"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        disabled={isDisabled}
        rows={1}
      />

      <button
        className={`flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-[#E8F8FC] ${
          isRecording ? 'bg-red-500 text-white' : ''
        }`}
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

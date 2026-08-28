import { API_BASE_URL } from '@/const';

export const getObjectKeyFromDownloadUrl = (downloadUrl: string) =>
  downloadUrl.split('?')[0].split('/').filter(Boolean).pop() ?? '';

export const getFileDownloadUrl = (objectKey: string) =>
  `${API_BASE_URL}/api/v1/file-storage/download/${objectKey}`;

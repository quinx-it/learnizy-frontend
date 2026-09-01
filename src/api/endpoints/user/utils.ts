export const getObjectKeyFromDownloadUrl = (downloadUrl: string) =>
  downloadUrl.split('?')[0].split('/').filter(Boolean).pop() ?? '';

export const getFileDownloadUrl = (objectKey: string) =>
  `/api/v1/file-storage/download/${objectKey}`;

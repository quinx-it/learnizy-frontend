export type VoiceFormValuesType = { file: Blob };
export type VoiceDataType = FormData;
export type FileUploadResponseType = { downloadUrl: string };

export const enum AIQueryStatus {
  Pending = 'PENDING',
  Answered = 'ANSWERED',
  Failed = 'FAILED',
}

export type CreateLessonAIQueryRequestType = {
  audioUrl?: string | null;
  questionText?: string | null;
};

export type LessonAIQueryType = {
  id: number;
  userId: number;
  lessonId: number;
  audioUrl: string | null;
  questionText: string | null;
  aiResponseText: string | null;
  status: AIQueryStatus;
  processingError: string | null;
  createdAt: string;
};

export type LessonAIQueryPageType = {
  content: LessonAIQueryType[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  numberOfElements: number;
  empty: boolean;
};

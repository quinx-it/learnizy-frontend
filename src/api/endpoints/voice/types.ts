export type VoiceFormValues = { file: Blob }
export type VoiceData = FormData
export type FileUploadResponse = { downloadUrl: string }

export type CreateLessonAIQueryRequest = {
  audioUrl?: string | null
  questionText?: string | null
}

export type LessonAIQuery = {
  id: number
  userId: number
  lessonId: number
  audioUrl: string | null
  questionText: string | null
  aiResponseText: string | null
  status: 'PENDING' | 'ANSWERED' | 'FAILED'
  processingError: string | null
  createdAt: string
}

export type LessonAIQueryPage = {
  content: LessonAIQuery[]
  pageable: {
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
    sort: { sorted: boolean; unsorted: boolean; empty: boolean }
  }
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  number: number
  sort: { sorted: boolean; unsorted: boolean; empty: boolean }
  numberOfElements: number
  empty: boolean
}
